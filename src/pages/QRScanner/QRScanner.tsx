import { useState } from "react";
import { Button, Flex, theme } from "antd";
import { QrReader } from "react-qr-reader";

const replaceHostName = (url: string, newHost: string): string => {
  const parsedUrl = new URL(url); // Parse the URL
  parsedUrl.host = newHost; // Replace the hostname
  return parsedUrl.toString(); // Return the updated URL as a string
};

export const QRScanner = () => {
  const [startScan, setStartScan] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <div>
      <div
        style={{
          marginTop: 24,
          padding: 24,
          minHeight: 380,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Flex justify="center" style={{ marginBottom: 48 }}>
          <Button
            type="primary"
            onClick={() => {
              setStartScan(!startScan);
            }}
          >
            {startScan ? "Stop Scan" : "Start Scan"}
          </Button>
        </Flex>
        {startScan && (
          <>
            <QrReader
              onResult={(result, error) => {
                if (!!result) {
                  // @ts-ignore
                  const scannedUrl = result?.text;
                  const updatedUrl = replaceHostName(
                    scannedUrl,
                    window.location.host
                  );
                  if (
                    scannedUrl.startsWith("http://") ||
                    scannedUrl.startsWith("https://")
                  ) {
                    window.location.href = updatedUrl;
                  } else {
                    console.warn(
                      "Scanned data is not a valid URL:",
                      scannedUrl
                    );
                  }
                }

                if (!!error) {
                  console.error(error);
                }
              }}
              constraints={{ facingMode: "environment" }}
            />
          </>
        )}
      </div>
    </div>
  );
};
