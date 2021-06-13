const prod = {
  url: {
    API_URL: "",
    API_URL_USERS: "",
    BASE_API_URL: "http://jtmc-alb-597752336.us-west-1.elb.amazonaws.com/cc-service/api/v1"
  }
};

const dev = {
  url: {
    BASE_API_URL: "http://localhost:8888/cc-service/api/v1"
  }
};

export const config = process.env.NODE_ENV === "development" ? dev : prod;
