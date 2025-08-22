import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ws_address } from "../config_key";
import { Message, RawMessage, User } from "../types/types";

function normalizeSide(side: number | User, fallbackName?: string): User {
  if (typeof side === "object" && side && "id" in side) {
    return { id: Number(side.id), name: side.name ?? "" };
  }
  return { id: Number(side), name: fallbackName ?? "" };
}

function normalizeMessage(m: RawMessage): Message {
  return {
    from: normalizeSide(m.from, m.from_name),
    to: normalizeSide(m.to, m.to_name),
    message: m.message ?? "",
  };
}

export function useChat(friendId: number) {
  const wsRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [myId, setMyId] = useState<number | null>(null);

  const addMessage = (msg: RawMessage | Message) => {
    const normalized = (msg as any).from?.id ? (msg as Message) : normalizeMessage(msg as RawMessage);
    setMessages((prev) => [...prev, normalized]);
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      const storedId = await AsyncStorage.getItem("id");
      if (storedId && mounted) {
        const idNum = Number(storedId);
        console.log("myId from storage:", idNum);
        setMyId(idNum);
      } else {
        console.warn("myId not found in storage");
      }
    })();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (!myId) return;
    let mounted = true;

    (async () => {
      setMessages([]);

      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.warn("No token in storage");
        return;
      }
      try {
        const res = await fetch(`${ws_address}/chat/${myId}/${friendId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          const history: RawMessage[] = await res.json();
          const normalized = history.map(normalizeMessage);
          if (mounted) {
            console.log("Loaded history items:", normalized.length);
            setMessages(normalized);
          }
        } else {
          console.warn("History fetch not ok:", res.status);
        }
      } catch (e) {
        console.error("Error fetching chat history:", e);
      }

      const ws = new WebSocket(`${ws_address}/ws?token=${token}`);
      wsRef.current = ws;

      ws.onopen = () => console.log("✅ WS connected");
      ws.onmessage = (e) => {
        if (!mounted) return;
        console.log("WS message raw:", e.data);
        try {
          const data: RawMessage = JSON.parse(e.data);
          console.log("WS message parsed:", data);
          addMessage(data);
        } catch (err) {
          console.error("Failed to parse WS message:", err);
        }
      };
      ws.onclose = () => console.log("❌ WS disconnected");
      ws.onerror = (err) => console.log("WS error", err);
    })();

    return () => {
      mounted = false;
      wsRef.current?.close();
    };
  }, [friendId, myId]);

  const sendMessage = (text: string) => {
    if (!myId || !text.trim()) return;
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      const msg = { from: myId, to: friendId, message: text.trim() };
      wsRef.current.send(JSON.stringify(msg));
    } else {
      console.warn("WS not open, cannot send");
    }
  };

  return { messages, sendMessage, myId };
}
