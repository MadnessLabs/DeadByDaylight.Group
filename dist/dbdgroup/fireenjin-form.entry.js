import { r as registerInstance, l as createEvent, j as Build, h, m as getElement } from './index-e5ab994a.js';

const formCss = "fireenjin-form{display:block}fireenjin-form .form-controls{opacity:1;pointer-events:all;transition:all ease-out 0.4s}fireenjin-form .form-controls ion-col:last-of-type{display:flex;flex-direction:row;justify-content:flex-end}fireenjin-form .is-hidden{opacity:0;pointer-events:none;height:0px}";

let Form = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.fireenjinFetch = createEvent(this, "fireenjinFetch", 7);
    this.fireenjinReset = createEvent(this, "fireenjinReset", 7);
    this.fireenjinSubmit = createEvent(this, "fireenjinSubmit", 7);
    this.fireenjinValidation = createEvent(this, "fireenjinValidation", 7);
    this.componentIsLoaded = false;
    /**
     * The data from the form being filled out
     */
    this.formData = {};
    /**
     * What the save button says
     */
    this.submitButton = "Save";
    /**
     * What color the submit button is
     */
    this.submitButtonColor = "primary";
    /**
     * What fill option to use for the submit button
     */
    this.submitButtonFill = "solid";
    /**
     * What the reset button says
     */
    this.resetButton = "Cancel";
    /**
     * What color the reset button is
     */
    this.resetButtonColor = "dark";
    /**
     * What fill option to use for the reset button
     */
    this.resetButtonFill = "clear";
    /**
     * Should the form controls be hidden?
     */
    this.hideControls = false;
    /**
     * Should the form disable the loader on submit
     */
    this.disableLoader = false;
    /**
     * Is the component currently loading
     */
    this.loading = false;
    /**
     * Should the enter button binding be disabled
     */
    this.disableEnterButton = false;
    /**
     * Should the form disable reset
     */
    this.disableReset = false;
    /**
     * Confirm leaving the page when the form is filled
     */
    this.confirmExit = false;
    /**
     * Has the form fields been changed
     */
    this.hasChanged = false;
    /**
     * The HTTP method to use when submitting the form
     */
    this.method = "post";
  }
  handleKeyDown(ev) {
    if (ev.key === "Enter" && this.disableEnterButton) {
      ev.preventDefault();
    }
  }
  async onInput(event) {
    var _a;
    if (event &&
      event.target &&
      event.target.name &&
      !event.target.name.startsWith("ion-")) {
      this.setByPath(this.formData, event.target.name, ((_a = this.filterData) === null || _a === void 0 ? void 0 : _a.length)
        ? await this.setFilteredValue(event.target.name, event.target.value)
        : event.target.value);
      if (this.componentIsLoaded && !this.hasChanged) {
        this.hasChanged = true;
      }
    }
  }
  async onSuccess(event) {
    var _a, _b, _c, _d, _e;
    if (this.fetch &&
      [this.endpoint, this.fetch].includes((_a = event === null || event === void 0 ? void 0 : event.detail) === null || _a === void 0 ? void 0 : _a.endpoint) &&
      ((_c = (_b = event === null || event === void 0 ? void 0 : event.detail) === null || _b === void 0 ? void 0 : _b.event) === null || _c === void 0 ? void 0 : _c.type) === "fireenjinFetch") {
      await this.setFormData(this.fetchKey
        ? this.fetchKey.split(".").reduce((o, i) => o[i], event.detail.data)
        : (_d = event === null || event === void 0 ? void 0 : event.detail) === null || _d === void 0 ? void 0 : _d.data);
    }
    if ([this.endpoint, this.fetch].includes((_e = event === null || event === void 0 ? void 0 : event.detail) === null || _e === void 0 ? void 0 : _e.endpoint)) {
      this.loading = false;
    }
  }
  async onError(event) {
    var _a;
    if (this.endpoint === ((_a = event === null || event === void 0 ? void 0 : event.detail) === null || _a === void 0 ? void 0 : _a.endpoint)) {
      this.loading = false;
    }
  }
  /**
   * Emit fireenjinSubmit event with form data
   * @param event The form submit event
   */
  async submit(event, options = {
    manual: false,
  }) {
    var _a;
    if (event)
      event.preventDefault();
    await this.checkFormValidity();
    this.loading = !this.disableLoader;
    const data = this.beforeSubmit && typeof this.beforeSubmit === "function"
      ? await this.beforeSubmit(this.formData, options)
      : this.formData;
    console.log(this.filterData);
    this.fireenjinSubmit.emit({
      event,
      id: this.documentId,
      endpoint: this.endpoint,
      data: ((_a = this.filterData) === null || _a === void 0 ? void 0 : _a.length) ? await this.filterFormData(data) : data,
      name: this.name,
    });
    this.hasChanged = false;
  }
  /**
   * Emit fireenjinReset event with form data
   * @param event The form reset event
   */
  async reset(event) {
    if (!event) {
      this.formEl.reset();
      return false;
    }
    if (this.disableReset) {
      event.preventDefault();
    }
    else {
      this.formData = {};
      this.hasChanged = false;
    }
    this.fireenjinReset.emit({
      event,
      id: this.documentId,
      endpoint: this.endpoint,
      data: this.formData,
      name: this.name,
    });
  }
  async checkFormValidity(reportValidity = true) {
    let isValid = true;
    const inputEls = [].slice.call(this.formEl.querySelectorAll("[value]"));
    for (const inputEl of inputEls) {
      try {
        if (!(await inputEl.checkValidity(!reportValidity
          ? {
            validationClassOptions: {
              ignoreInvalid: true,
            },
          }
          : null))) {
          if (isValid && reportValidity) {
            await inputEl.reportValidity();
          }
          isValid = false;
        }
      }
      catch (_a) {
        console.log(`${inputEl === null || inputEl === void 0 ? void 0 : inputEl.name} input not able to be validated!`);
      }
    }
    return isValid;
  }
  async reportFormValidity() {
    const isValid = await this.checkFormValidity(false);
    this.fireenjinValidation.emit({
      event,
      isValid,
      name: this.name,
    });
    if (this.submitButtonEl) {
      this.submitButtonEl.disabled = !isValid;
    }
  }
  async setFormData(data) {
    const fields = this.formEl.querySelectorAll("[data-fill]");
    fields.forEach((field) => {
      var _a, _b;
      const dataKey = ((_b = (_a = field.dataset) === null || _a === void 0 ? void 0 : _a.fill) === null || _b === void 0 ? void 0 : _b.length) > 0 ? field.dataset.fill : field.name;
      field.value = this.getByPath(data, dataKey);
    });
    this.formData = await this.mapFormData(this.fetchDataMap, data || {});
  }
  async setFilteredValue(key, value) {
    var _a, _b;
    let newValue = value;
    for (const filter of typeof this.filterData === "string"
      ? this.filterData.split(",")
      : this.filterData) {
      if (typeof filter !== "function")
        continue;
      const filterName = (_b = (_a = Object.getOwnPropertyDescriptors(filter)) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.value;
      if (!filterName || filterName !== key)
        continue;
      newValue = await filter(value);
    }
    return newValue;
  }
  async mapFormData(dataMap, data) {
    let newData = data ? data : {};
    if (dataMap) {
      const dataKeys = Object.keys(dataMap);
      for (const key of dataKeys) {
        if (dataMap[key]) {
          newData[dataMap[key]] = data[key];
        }
        else {
          newData = Object.assign(Object.assign({}, newData), data[key]);
        }
      }
    }
    return newData;
  }
  async filterFormData(data) {
    var _a, _b;
    let filteredData = {};
    for (const filter of typeof this.filterData === "string"
      ? this.filterData.split(",")
      : this.filterData) {
      if (typeof filter === "string") {
        filteredData[filter] = data[filter];
      }
      else if (typeof filter === "function") {
        const key = (_b = (_a = Object.getOwnPropertyDescriptors(filter)) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.value;
        filteredData[key] = await filter(data[key]);
      }
    }
    return filteredData;
  }
  pick(sourceObject, keys) {
    const newObject = {};
    for (const key of keys) {
      if (!(sourceObject === null || sourceObject === void 0 ? void 0 : sourceObject[key]))
        continue;
      newObject[key] = sourceObject[key];
    }
    return newObject;
  }
  getByPath(o, s) {
    s = s.replace(/\[(\w+)\]/g, ".$1"); // convert indexes to properties
    s = s.replace(/^\./, ""); // strip a leading dot
    var a = s.split(".");
    for (var i = 0, n = a.length; i < n; ++i) {
      var k = a[i];
      if (k in o) {
        o = o[k];
      }
      else {
        return;
      }
    }
    return o;
  }
  setByPath(obj, path, value) {
    const pList = path.split(".");
    const len = pList.length;
    for (let i = 0; i < len - 1; i++) {
      const elem = pList[i];
      if (!obj[elem])
        obj[elem] = {};
      obj = obj[elem];
    }
    obj[pList[len - 1]] = value;
  }
  componentDidLoad() {
    if (!(Build === null || Build === void 0 ? void 0 : Build.isBrowser))
      return;
    setTimeout(() => {
      this.componentIsLoaded = true;
    }, 2000);
    if (this.fetch) {
      if (!this.disableLoader)
        this.loading = true;
      this.fireenjinFetch.emit({
        endpoint: typeof this.fetch === "string" ? this.fetch : this.endpoint,
        name: this.name || null,
        dataPropsMap: this.fetchDataMap || null,
        method: "get",
        params: Object.assign(Object.assign({}, (this.fetchParams ? this.fetchParams : {})), { id: this.documentId }),
      });
    }
    if (this.formData) {
      this.setFormData(this.formData);
    }
  }
  render() {
    return (h("form", { ref: (el) => (this.formEl = el), name: this.name, id: this.name, action: this.action ? this.action : `/${this.endpoint}`, method: this.method, onReset: (event) => this.reset(event), onSubmit: (event) => this.submit(event), class: { "is-loading": this.loading } }, h("slot", null), !this.hideControls && (h("ion-grid", { class: "form-controls" }, h("ion-row", null, h("ion-col", null, this.resetButton ? (h("ion-button", { ref: (el) => (this.resetButtonEl = el), type: "reset", fill: this.resetButtonFill, color: this.resetButtonColor, innerHTML: this.resetButton })) : null), h("ion-col", null, this.submitButton ? (h("ion-button", { ref: (el) => (this.submitButtonEl = el), type: "submit", color: this.submitButtonColor, fill: this.submitButtonFill, innerHTML: this.submitButton })) : null))))));
  }
  get fireenjinFormEl() { return getElement(this); }
};
Form.style = formCss;

export { Form as fireenjin_form };
