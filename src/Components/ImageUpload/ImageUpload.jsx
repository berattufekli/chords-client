/*!

=========================================================
* Now UI Dashboard PRO React - v1.5.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect } from "react";
// used for making the prop types of this component
import PropTypes from "prop-types";

// reactstrap components

// core components
import defaultImage from "assets/images/image_placeholder.jpg";
import defaultAvatar from "assets/images/placeholder.jpg";

function ImageUpload(props) {
  const [fileState, setFileState] = React.useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState(
    props.avatar ? defaultAvatar : defaultImage
  );

  const { handleSetImage } = props;
  const fileInput = React.useRef();

  useEffect(() => {
    setFileState(props.file);
    let reader = new FileReader();

    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    if (props.file) {
      reader.readAsDataURL(props.file);
    } else {
      setFileState(null);
      setImagePreviewUrl(props.avatar ? defaultAvatar : defaultImage);
    }
  }, [props.file]);

  useEffect(() => {
    if (props.url && props.url.length > 0) {
      setImagePreviewUrl(props.url);
      setFileState(props.url);
    }
  }, [props.url]);

  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFileState(file);
      setImagePreviewUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
    handleSetImage(file);
  };
  // eslint-disable-next-line
  const handleSubmit = (e) => {
    e.preventDefault();
    // fileState is the file/image uploaded
    // in this function you can save the image (fileState) on form submit
    // you have to call it yourself
  };
  const handleClick = () => {
    fileInput.current.click();
  };
  const handleRemove = () => {
    fileInput.current.value = null;
    setFileState(null);
    setImagePreviewUrl(props.avatar ? defaultAvatar : defaultImage);
    handleSetImage(null);
  };
  return (
    <div className="fileinput text-center">
      <input
        style={{ display: "none" }}
        type="file"
        onChange={handleImageChange}
        ref={fileInput}
        accept="image/*"
      />

      <div className="">
        <label htmlFor="photo" className="text-left block text-sm font-medium leading-6 text-gray-900">
          Photo
        </label>
        <div className="mt-1 flex items-center gap-x-3">
          <img
            className="inline-block w-24 h-24 rounded-lg"
            src={imagePreviewUrl}
            alt=""
          />
          {
            fileState === null ? (
              <span className="flex">
                <button
                  type="button"
                  onClick={() => handleClick()}
                  className="rounded-md w-24 bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Ekle
                </button>
              </span>
            ) :

              (
                <span className="flex space-x-2">
                  <button
                    className="rounded-md w-24 bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    onClick={() => handleClick()}>
                    Değiştir
                  </button>
                  {props.avatar ? <br /> : null}
                  <button
                    color="secondary"
                    className="rounded-md w-24 bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
                    onClick={() => handleRemove()}
                  >
                    Kaldır
                  </button>
                </span>
              )
          }
        </div>
      </div>
    </div>
  );
}

ImageUpload.propTypes = {
  avatar: PropTypes.bool,
};

export default ImageUpload;
