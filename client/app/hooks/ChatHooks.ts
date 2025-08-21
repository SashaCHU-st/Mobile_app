import { useEffect, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ws_address } from "../config_key";
import { Message } from "../types/types";

export function useChat(friendId: number) {
  const wsRef = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [myId, setMyId] = useState<number | null>(null);

  const addMessage = async (msg: Message) => {
    setMessages((prev) => {
      const newMessages = [...prev, msg];
      if (myId) {
        AsyncStorage.setItem(
          `chat_${myId}_${friendId}`,
          JSON.stringify(newMessages)
        );
      }
      return newMessages;
    });
  };

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const token = await AsyncStorage.getItem("token");
      const storedId = await AsyncStorage.getItem("id");
      if (!token) return;
      if (storedId && isMounted) setMyId(Number(storedId));
    })();

    return () => {
      isMounted = false;
      wsRef.current?.close();
    };
  }, []);

  useEffect(() => {
    if (!myId) return;
    let isMounted = true;

    (async () => {
      setMessages([]);
      const token = await AsyncStorage.getItem("token");
      try {
        const res = await fetch(`${ws_address}/chat/${myId}/${friendId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          const chatHistory: Message[] = await res.json();
          if (isMounted) setMessages(chatHistory);
        }
      } catch (err) {
        console.log("Error fetching chat history:", err);
      }

      if (!token) return;
      const ws = new WebSocket(`${ws_address}/ws?token=${token}`);
      wsRef.current = ws;

      ws.onopen = () => console.log("✅ WS connected");

      ws.onmessage = (e) => {
        if (!isMounted) return;
        const data = JSON.parse(e.data);

        addMessage(data);
      };

      ws.onclose = () => console.log("❌ WS disconnected");
      ws.onerror = (err) => console.log("WS error", err);
    })();

    return () => {
      isMounted = false;
      wsRef.current?.close();
    };
  }, [friendId, myId]);

  const sendMessage = (text: string) => {
    if (!myId || !text.trim()) return;
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      const msg = { from: myId, to: friendId, message: text.trim() };
      wsRef.current.send(JSON.stringify(msg));
    }
  };

  return { messages, sendMessage, myId };
}
