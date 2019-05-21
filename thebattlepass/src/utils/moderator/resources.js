import apiRequest from "./../../api";
import { getBase64 } from "./../general";

const getResourcesComponents = (entry, entryName, callback, submitCallback) => {
  const { width, height, title, url, type } = entry;
  const isNew = entryName === "resources-new";
  return [
    [
      {
        title: "Resource Name",
        type: "input",
        value: title,
        callback: e => {
          callback(entryName, { title: e });
        }
      },
      {
        type: "radio",
        title: "Type",
        selected: type,
        values: [{ value: "icon", title: "icon" }],
        callback: e => {
          callback(entryName, { ...entry, type: e });
        }
      }
    ],
    [
      {
        title: "Width",
        type: "input",
        value: width != null && String(width),
        callback: e => {
          callback(entryName, { width: e === "" ? null : Number(e) });
        }
      },
      {
        title: "Height",
        type: "input",
        value: height != null && String(height),
        callback: e => {
          callback(entryName, { height: e === "" ? null : Number(e) });
        }
      }
    ],
    [
      {
        type: "dropzone",
        title: "Add new Resource",
        image: url,
        callback: e => {
          const file = e[0];
          const url = URL.createObjectURL(file);
          callback(entryName, { file, url });
        }
      }
    ],
    [
      {
        type: "button",
        title: isNew ? "Add Resource" : "Update Resource",
        callback: e => {
          const { width, height, title, type, file, resourceId } = entry;
          if (isNew) {
            if (file) {
              getBase64(file).then(image => {
                apiRequest({
                  name: `postResourcesCreate`,
                  body: { width, height, title, type, image }
                }).then(() => submitCallback({ resources: true }));
              });
            }
          } else {
            apiRequest({
              name: `postResourcesUpdate`,
              body: { width, height, title, type, resourceId }
            }).then(() => submitCallback({ resources: true }));
          }
        }
      },
      {
        type: "button",
        hidden: isNew,
        title: "Delete Resource",
        callback: e => {
          const { title, resourceId, type } = entry;
          apiRequest({
            name: "postResourcesDelete",
            body: { title, resourceId, type }
          }).then(() => submitCallback({ resources: true }));
        }
      }
    ]
  ];
};

export { getResourcesComponents };
