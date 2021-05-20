const prod = {
  url: {
    API_URL: "",
    API_URL_USERS: "",
    BASE_API_URL: "https://catalog-counts-nropm.ondigitalocean.app/cc-service-api/cc-service/api/v1"
  }
};

const dev = {
  url: {
    BASE_API_URL: "http://localhost:8888/cc-service/api/v1"
  }
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
