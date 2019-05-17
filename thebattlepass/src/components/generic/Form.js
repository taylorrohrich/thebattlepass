import React from "react";

import Dropzone from "react-dropzone";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";

const mapMenuItems = values => {
  return values.map((value, i) => (
    <MenuItem key={`menuItem-${i}`} value={value.value || ""}>
      <div>{value.title}</div>
    </MenuItem>
  ));
};
const SelectComponent = props => {
  const { title, values, selected, callback } = props;
  return (
    <div className="formComponent flex-one flex-column ">
      <FormControl>
        <InputLabel>{title}</InputLabel>
        <Select value={selected || ""} onChange={e => callback(e.target.value)}>
          {mapMenuItems(values)}
        </Select>
      </FormControl>
    </div>
  );
};
const InputComponent = props => {
  const { title, value, callback, disabled } = props;
  return (
    <div className="formComponent flex-one flex-column ">
      <FormControl>
        <TextField
          disabled={disabled}
          label={title}
          value={value || ""}
          onChange={e => callback(e.target.value)}
        />
      </FormControl>
    </div>
  );
};

const mapRadioItems = values => {
  return values.map((value, i) => (
    <FormControlLabel
      key={`radio-${i}`}
      value={value.value || ""}
      control={<Radio />}
      label={value.title}
    />
  ));
};
const RadioComponent = props => {
  const { title, values, selected, callback } = props;
  return (
    <div className="formComponent flex-column flex-one">
      <FormControl>
        <FormLabel component="legend">{title}</FormLabel>
        <RadioGroup
          row
          value={selected || ""}
          onChange={e => callback(e.target.value)}
        >
          {mapRadioItems(values)}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

const ButtonComponent = props => {
  const { title, callback } = props;
  return (
    <div className="formComponent flex-column ">
      <Button color="primary" onClick={callback}>
        {title}
      </Button>
    </div>
  );
};

const DropzoneComponent = props => {
  const { title, callback, image } = props;
  return (
    <div className="formComponent  flex-column flex-one">
      <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div
              className="dropzone flex-column flex-one align-center justify-center color-white"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {image ? (
                <img className="dropzoneImage" src={image} alt="" />
              ) : (
                <p>{title}</p>
              )}
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
};
const getComponent = type => {
  let Component = null;
  switch (type) {
    case "select":
      Component = SelectComponent;
      break;
    case "input":
      Component = InputComponent;
      break;
    case "radio":
      Component = RadioComponent;
      break;
    case "button":
      Component = ButtonComponent;
      break;
    case "dropzone":
      Component = DropzoneComponent;
      break;

    default:
      Component = null;
  }
  return Component;
};
const mapComponents = components => {
  return components.map((row, i) => {
    const rowComponents = row.map((component, j) => {
      const Component = getComponent(component.type);
      return (
        <Component key={`col-${j}`} className="formComponent" {...component} />
      );
    });
    return (
      <div key={`row-${i}`} className="flex-row">
        {rowComponents}
      </div>
    );
  });
};
const Form = props => {
  const { components, title } = props;
  if (!components) return <div />;
  return (
    <div className="formContainer flex-column flex-one">
      <div className="xl">{title}</div>
      {mapComponents(components)}
    </div>
  );
};

export default Form;
