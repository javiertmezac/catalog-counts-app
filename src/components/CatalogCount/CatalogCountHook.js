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

function Post({url, headers, payload}) {
  console.log("post")
//   const [res, setRest] = useState({ data: null, error: null, isLoading: false });
//   // const [error, setError] = 
//  console.log('post method')
//   async function postUrl() {
//     const response = await fetch (url, {
//       method: 'POST',
//       headers: headers,
//       data: payload
//     });

//     const json = await response.json();
//     console.log('json from post useFetch: ', json)
//     setRest(json)
//   }

//   useEffect(() => {
//     postUrl();
//   }, []);
//   return [res];
}

export { Get, Post };
// export { useFetch};