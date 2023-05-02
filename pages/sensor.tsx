import { LIST_OF_SENSORS } from "@configs/sensor";
import {
  NEXT_PUBLIC_MQTT_CLIENT_ID,
  NEXT_PUBLIC_MQTT_PASSWORD,
  NEXT_PUBLIC_MQTT_URI,
  NEXT_PUBLIC_MQTT_USERNAME,
} from "@env";
import { MqttConnectionLayout } from "@layouts/MqttConnectionLayout";
import { Button } from "@material-tailwind/react";
import type { MqttClient } from "mqtt";
import { useEffect, useMemo, useRef, useState } from "react";

export default function Home() {
  const [incommingMessages, setIncommingMessages] = useState<any[]>([]);
  const addMessage = (message: any) => {
    setIncommingMessages((incommingMessages) => [
      ...incommingMessages,
      message,
    ]);
  };
  const clearMessages = () => {
    setIncommingMessages(() => []);
  };

  const incomingMessageHandler = useRef(
    LIST_OF_SENSORS.map((sensor) => ({
      topic: sensor,
      handler: (msg: string) => {
        console.log({ msg });
        addMessage(msg);
      },
    }))
  );

  const [client, setClient] = useState<MqttClient | null>(null);
  const setMqttClient = (client: MqttClient) => {
    setClient(client);
  };

  const publishMessages = (client: any) => {
    if (!client) {
      console.log("(publishMessages) Cannot publish, mqttClient: ", client);
      return;
    }

    client.publish("topic1", "1st message from component");
  };

  const mqttConnectionLayoutParams = useMemo(
    () => ({
      uri: NEXT_PUBLIC_MQTT_URI,
      options: {
        username: NEXT_PUBLIC_MQTT_USERNAME,
        password: NEXT_PUBLIC_MQTT_PASSWORD,
        clientId: NEXT_PUBLIC_MQTT_CLIENT_ID,
      },
      topicHandlers: incomingMessageHandler.current,
      onConnectedHandler: (client: any) => setMqttClient(client),
    }),
    []
  );
  return (
    <MqttConnectionLayout {...mqttConnectionLayoutParams}>
      <div className="bg-white flex p-20 mx-20 justify-between">
        <div className="h-[80vh] overflow-y-scroll">
          <h2>Subscribed Topics</h2>
          {incomingMessageHandler.current.map((i) => (
            <p key={Math.random()}>{i.topic}</p>
          ))}
          <h2>Incomming Messages:</h2>
          <div className="grid grid-cols-5">
            {incommingMessages.map((m) => (
              <p key={Math.random()}>
                {m.topic.toString() + ": " + m.payload.toString()}
              </p>
            ))}
          </div>
        </div>
        <div className="gap-4">
          {" "}
          <Button
            onClick={() => publishMessages(client)}
            nonce={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
          >
            Publish Test Messages
          </Button>
          <Button
            onClick={() => clearMessages()}
            nonce={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
          >
            Clear Test Messages
          </Button>
        </div>
      </div>
    </MqttConnectionLayout>
  );
}
