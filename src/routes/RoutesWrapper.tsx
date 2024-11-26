import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NotFoundPage, QRScanner, UploadOrderImage } from "../pages";

export const RoutesWrapper = () => {
  return (
    // <BrowserRouter basename={process.env.PUBLIC_URL}>
    <BrowserRouter >
      <Routes>
        <Route
          path="/QR/"
          element={
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#f5f5f5",
              }}
            >
              <QRScanner />
            </div>
          }
        />
        <Route
          path="/QR/upload-image"
          element={
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#f5f5f5",
              }}
            >
              <UploadOrderImage />
            </div>
          }
        />
        <Route path="/QR/upload" element={<h1>Hello</h1>} />
        <Route
          path="/upload-image"
          element={
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#f5f5f5",
              }}
            >
              <UploadOrderImage />
            </div>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};
