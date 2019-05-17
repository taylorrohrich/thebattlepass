import React from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "./generic.scss";

const mapMenuItems = values => {
  return values.map((value, i) => (
    <MenuItem key={`menuItem-${i}`} value={value.value}>
      <div>{value.title}</div>
    </MenuItem>
  ));
};
const mapSelects = selects => {
  return selects.map((select, i) => {
    const { callback, title, values, selected } = select;
    return (
      <FormControl key={`select-${i}`} className="flex-one flex-column">
        <InputLabel>{title}</InputLabel>
        <Select
          value={selected || ""}
          onChange={e => {
            callback(e.target.value);
          }}
        >
          {mapMenuItems(values)}
        </Select>
      </FormControl>
    );
  });
};
class SelectModal extends React.Component {
  state = {
    open: false
  };
  toggleOpen = () => {
    this.setState(state => {
      return { open: !state.open };
    });
  };
  render() {
    const { selects, title } = this.props,
      { open } = this.state;
    return (
      <div className="flex-one flex-column">
        <div
          onClick={this.toggleOpen}
          className="color-white xl selectModalContainer pointer flex-one justify-center align-center flex-column"
        >
          {title}
        </div>

        <Dialog open={open} disableBackdropClick disableEscapeKeyDown>
          <DialogContent
            style={{ width: 500, height: 500 }}
            className=" flex-one flex-column"
          >
            {mapSelects(selects)}
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
export default SelectModal;
