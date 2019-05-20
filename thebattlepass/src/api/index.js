import axios from "axios";
import { forEach, some } from "lodash";

const apiRequest = async ({ name, body, parameters, formData }) => {
  if (parameters && some(parameters, parameter => parameter === null)) {
    alert("not all fields filled out");
  } else {
    const method = routes[name][1],
      websiteUrl =
        "https://i1os4xxzw4.execute-api.us-east-2.amazonaws.com/prod",
      // process.env.NODE_ENV === "development"
      //   ? "https://i1os4xxzw4.execute-api.us-east-2.amazonaws.com/prod"
      //   : "/api",
      url = websiteUrl + routes[name][0],
      data = formData ? formDataBody({ name, formData }) : body,
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

export default apiRequest;
const formDataBody = ({ name, formData }) => {
  let bodyFormData = new FormData();
  forEach(formData, (value, key) => bodyFormData.set(key, value));
  return bodyFormData;
};

const resources = [
  {
    id: 1,
    title: "cat1",
    width: 25,
    height: 25,
    url:
      "https://images.pexels.com/photos/259803/pexels-photo-259803.jpeg?cs=srgb&dl=adorable-animal-animal-photography-259803.jpg&fm=jpg"
  },
  {
    id: 2,
    title: "cat2",
    width: 25,
    height: 25,
    url:
      "https://images.pexels.com/photos/259803/pexels-photo-259803.jpeg?cs=srgb&dl=adorable-animal-animal-photography-259803.jpg&fm=jpg"
  },
  {
    id: 3,
    title: "cat3",
    width: 25,
    height: 25,
    url:
      "https://images.pexels.com/photos/259803/pexels-photo-259803.jpeg?cs=srgb&dl=adorable-animal-animal-photography-259803.jpg&fm=jpg"
  }
];
const seasonList = [
  {
    number: 9,
    id: 1
  },
  {
    number: 10,
    id: 2
  },
  {
    number: 11,
    id: 3
  }
];
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
