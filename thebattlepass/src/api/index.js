const apiRequest = async ({ name, parameters }) => {
  if (name === "getSeasonActive") {
    return { data: { number: 9 } };
  }
  if (name === "getSeason") {
    return { data: parameters.number === 9 ? season : null };
  }
  if (name === "getSeasonList") {
    return { data: seasonList };
  }
  if (name === "getSeasonEvents") {
    return { data: season.events };
  }
  if (name === "getResources") {
    return { data: resources };
  }
};

export default apiRequest;

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
// const routes = {
//   getSeasonActive: ["/Season/Active", "GET"],
//   getSeason: ["/Season/Number", "GET"],
//   getSeasonList: ["/Season/List", "GET"],
//   postSeasonCreate: ["/Season/Create", "POST"],
//   postSeasonUpdate: ["/Season/Update", "POST"],
//   postSeasonDelete: ["/Season/Delete", "POST"],
//   postWeekCreate: ["/Season/Week/Create", "POST"],
//   postWeekDelete: ["/Season/Week/Delete", "POST"],
//   postChallengeCreate: ["/Challenge/Create", "POST"],
//   postChallengeUpdate: ["/Challenge/Update", "POST"],
//   getImageType: ["/Image/Type", "GET"],
//   postImageCreate: ["/Image/Create", "POST"],
//   postImageUpdate: ["/Image/Update", "POST"],
//   postImageDelete: ["/Image/Delete", "POST"],
//   postLocationCreate: ["/Challenge/Location/Create", "POST"],
//   postLocationUpdate: ["/Challenge/Location/Update", "POST"],
//   postLocationDelete: ["/Challenge/Location/Delete", "POST"]
// };

const season = {
  number: 9,
  id: 123,
  events: [
    {
      title: "Week 1",
      style: "default",
      id: 1,
      challenges: [
        {
          id: 1,
          type: 0,
          stages: [
            {
              title:
                "Complete any 4 of the challenges below to earn the reward",
              rewardType: "xp",
              rewardCount: 10,
              coordinates: [{ x: 0.3, y: 0.2, title: "test", url: null }],
              iconId: 1
            }
          ]
        },
        {
          id: 2,
          type: 1,
          stages: [
            {
              title: "Challenge",
              count: 3,
              rewardType: "battlestar",
              rewardCount: 10,
              coordinates: [
                {
                  x: 0.3,
                  y: 0.2,
                  title: "test",
                  url:
                    "https://images.pexels.com/photos/259803/pexels-photo-259803.jpeg?cs=srgb&dl=adorable-animal-animal-photography-259803.jpg&fm=jpg"
                }
              ],
              iconId: 1
            }
          ]
        },
        {
          id: 3,
          type: 2,
          stages: [
            ({
              title: "Challenge",

              count: 3,
              rewardType: "battlestar",
              rewardCount: 10,
              coordinates: [{ x: 0.3, y: 0.2, title: "test", url: null }],
              iconId: 1
            },
            {
              title:
                "Challenge a lot of things need to be done oh man oh boy will this fit inside oh boy oh gee of man oh my o man ",
              count: 3,
              rewardType: "battlestar",
              rewardCount: 10,
              coordinates: [{ x: 0.3, y: 0.2, title: "test", url: null }],
              iconId: 1
            })
          ]
        }
      ]
    },
    {
      title: "Week 2",
      style: "default",
      id: 2,
      challenges: [
        {
          id: 5,
          type: 0,
          stages: [
            {
              title:
                "Complete any 4 of the challenges below to earn the reward",
              rewardType: "xp",
              rewardCount: 10,
              coordinates: [{ x: 0.3, y: 0.2, title: "test", url: null }],
              iconId: 1
            }
          ]
        },
        {
          id: 6,
          type: 1,
          stages: [
            {
              title: "Challenge",
              count: 3,
              rewardType: "battlestar",
              rewardCount: 10,
              coordinates: [{ x: 0.3, y: 0.2, title: "test", url: null }],
              iconId: 1
            }
          ]
        },
        {
          id: 7,
          type: 2,
          stages: [
            {
              title: "Challenge",

              count: 3,
              rewardType: "battlestar",
              rewardCount: 10,
              coordinates: [{ x: 0.3, y: 0.2, title: "test", url: null }],
              iconId: 1
            },
            {
              title:
                "Challenge a lot of things need to be done oh man oh boy will this fit inside oh boy oh gee of man oh my o man ",
              count: 3,
              rewardType: "battlestar",
              rewardCount: 10,
              coordinates: [{ x: 0.3, y: 0.2, title: "test", url: null }],
              iconId: 1
            }
          ]
        }
      ]
    }
  ]
};
