import { useState, useEffect } from "react";

function HeaderTitle() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const today = new Date();
    setCurrentDate(today.toLocaleDateString("id-ID", options));
  }, []);

  return (
    <>
      <h1 className="card-title">Todo App</h1>
      <h2 className=" fw-light fs-4">{currentDate}</h2>
    </>
  );
}

export default HeaderTitle;
