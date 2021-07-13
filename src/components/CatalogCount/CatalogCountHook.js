import { useState, useEffect } from "react";

function Get(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchUrl() {
    const response = await fetch(url);
    if (response.status === 200) {
      const json = await response.json();
      setData(json);
      setLoading(false);
    } else {
      console.log("Something went wrong while fetching data!")
    }
  }

  useEffect(() => {
    fetchUrl();
  }, []);
  return [data, loading];
}

export { Get };