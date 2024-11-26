import { useState } from "react";
import { Button, Flex, theme } from "antd";
import { QrReader } from "react-qr-reader";
import { useNavigate } from "react-router-dom";

const formatUrl = (inputUrl: string): string => {
  const url = new URL(inputUrl); // Parse the input URL
  const pathname = url.pathname; // Extract the pathname
  const search = url.search; // Extract the query string
  return `${pathname}${search}`; // Combine pathname and query string
};

export const QRScanner = () => {
  const [startScan, setStartScan] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
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
                  const updatedUrl = formatUrl(scannedUrl);
                  console.log({ updatedUrl });
                  if (
                    scannedUrl.startsWith("http://") ||
                    scannedUrl.startsWith("https://")
                  ) {
                    // window.location.href = updatedUrl;
                    navigate(updatedUrl);
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
