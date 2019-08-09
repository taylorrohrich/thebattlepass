import axios from "axios";
import { some } from "lodash";

const apiRequest = async ({ name, body, parameters, formData }) => {
  if (parameters && some(parameters, parameter => parameter === null)) {
    alert("not all fields filled out");
  } else {
    const method = routes[name][1],
      websiteUrl =
        process.env.NODE_ENV === "development"
          ? "https://i1os4xxzw4.execute-api.us-east-2.amazonaws.com/prod"
          : "/api",
      url = websiteUrl + routes[name][0],
      data = body,
      config = formData
        ? { headers: { "Content-Type": "multipart/form-data" } }
        : null,
      fetchData = {
        url,
        method,
        data,
        params: parameters,
        config
      };
    return axios(fetchData).then(response => {
      return response;
    });
  }
};

const routes = {
  getEvents: ["/events", "GET"],
  getResources: ["/resources", "GET"],
  getSeasonsActive: ["/seasons/active", "GET"],
  getSeasonsList: ["/seasons/list", "GET"],
  postEventsCreate: ["/events/create", "POST"],
  postEventsDelete: ["/events/delete", "POST"],
  postEventsUpdate: ["/events/update", "POST"],
  postResourcesCreate: ["/resources/create", "POST"],
  postResourcesDelete: ["/resources/delete", "POST"],
  postResourcesUpdate: ["/resources/update", "POST"],
  postSeasonsCreate: ["/seasons/create", "POST"],
  postSeasonsDelete: ["/seasons/delete", "POST"],
  postSeasonsUpdate: ["/seasons/update", "POST"]
};

export default apiRequest;
