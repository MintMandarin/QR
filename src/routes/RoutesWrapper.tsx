import { Route, Routes } from "react-router-dom";
import { NotFoundPage, QRScanner, UploadOrderImage } from "../pages";

export const RoutesWrapper = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
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
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </>
  );
};
