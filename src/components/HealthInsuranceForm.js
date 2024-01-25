  import React, { useState, useEffect } from "react";
  import Select from "react-select";
  import TextField from "@mui/material/TextField";
  import FormControl from "@mui/material/FormControl";
  // import debounce from 'lodash.debounce';
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import axios from "axios";
  import { useUser } from "../hook/useUser";

  // DRY Principle: Reusable ServiceQuestions component promotes code reusability and minimizes duplication.
  // The HealthInsuranceForm component leverages this to create a dynamic and maintainable form.

  /**
   * Component for rendering additional service questions.
   *
   * @param {Object} props - Component props.
   * @param {string} props.questionTitle - Title of the service question.
   * @param {Function} props.handleChange - Function to handle form data changes.
   * @param {string} props.additionalQuestionId - Identifier for additional question.
   * @param {Array} props.regionOptions - Options for selecting regions.
   * @param {Object} props.formData - Form data for the service questions.
   * @returns {JSX.Element} - ServiceQuestions component.
   */

  const ServiceQuestions = ({
    questionTitle,
    handleChange,
    additionalQuestionId,
    regionOptions,
    formData,
  }) => {
    const inputStyle = {
      backgroundColor: "#353535", // Set the background color
      borderRadius: "25px", // Set the border radius for rounded edges
      color: "white", // Set default text color to white
      "& input": {
        color: "white", // Set text color for input
        borderRadius: "25px", // Set border radius for input
      },
      "& div": {
        color: "#D3D3D3", // Set text color for select value
        borderRadius: "25px", // Set border radius for select
      },
    };
    
    

    return (
      <div className="lg:w-2/3 mx-auto bg-gray-700 p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl text-white mb-4">{questionTitle}</h2>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <label className="text-white">
            Do you offer additional {questionTitle.toLowerCase()} services?
          </label>
          <Select
            id={`offer${questionTitle}Service`}
            options={[
              { value: "yes", label: "Yes as a separate service" },
              { value: "no", label: "No" },
              { value: "special", label: "Only under special circumstances" },
            ]}
            placeholder="Yes as a separate service/no/only under special circumstances"
            value={
              formData[`offer${questionTitle}Service${additionalQuestionId}`] ||
              null
            }
            onChange={(selectedOption) =>
              handleChange(
                `offer${questionTitle}Service${additionalQuestionId}`,
                selectedOption
              )
            }
            styles={{ control: (provided) => ({ ...provided, ...inputStyle }) }}
          />
        </FormControl>

        {formData[`offer${questionTitle}Service${additionalQuestionId}`] &&
          formData[`offer${questionTitle}Service${additionalQuestionId}`]
            .value === "yes" && (
            <>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <label className="text-white">If Yes: How often?</label>
                <TextField
                  id={`howOften${additionalQuestionId}`}
                  type="text"
                  placeholder="Add a brief description"
                  value={formData[`howOften${additionalQuestionId}`] || ""}
                  onChange={(e) =>
                    handleChange(
                      `howOften${additionalQuestionId}`,
                      e.target.value
                    )
                  }
                  variant="filled"
                  sx={{
                    ...inputStyle,
                    "& .MuiFilledInput-root": {
                      border: "1px solid white", // Add border style here
                    },
                  }}
                />
              </FormControl>
            </>
          )}

        <FormControl fullWidth sx={{ mb: 2 }}>
          <label className="text-white">
            Do you offer this service in your complete supply area?
          </label>
          <Select
            id={`offerInSupplyArea${additionalQuestionId}`}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
            placeholder="Yes/no/"
            value={formData[`offerInSupplyArea${additionalQuestionId}`] || null}
            onChange={(selectedOption) =>
              handleChange(
                `offerInSupplyArea${additionalQuestionId}`,
                selectedOption
              )
            }
            styles={{ control: (provided) => ({ ...provided, ...inputStyle }) }}
          />
        </FormControl>

        {formData[`offerInSupplyArea${additionalQuestionId}`] &&
          formData[`offerInSupplyArea${additionalQuestionId}`].value === "no" && (
            <>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <label className="text-white">If no: specify the regions</label>
                <Select
                  id={`${questionTitle.toLowerCase()}Region`}
                  options={regionOptions}
                  placeholder={`Region A/Region B/Region C/Region D (select multiple)`}
                  value={formData[`${questionTitle.toLowerCase()}Region`] || null}
                  onChange={(selectedOption) =>
                    handleChange(
                      `${questionTitle.toLowerCase()}Region`,
                      selectedOption
                    )
                  }
                  isMulti
  styles={{
    control: (provided) => ({ ...provided, ...inputStyle }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "black", // Set the background color for selected values
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "white", // Set the text color for selected values
    }),
  }}
/>
              </FormControl>
            </>
          )}

        <FormControl fullWidth sx={{ mb: 2 }}>
          <label className="text-white">
            Could extend this service with a service from your bonus program?
          </label>
          <Select
            id={`additionalQuestion${additionalQuestionId}`}
            options={[
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
              { value: "keine angabe", label: "Keine Angabe" },
            ]}
            placeholder="Yes/no/keine Angabe"
            value={formData[`additionalQuestion${additionalQuestionId}`] || null}
            onChange={(selectedOption) =>
              handleChange(
                `additionalQuestion${additionalQuestionId}`,
                selectedOption
              )
            }
            styles={{ control: (provided) => ({ ...provided, ...inputStyle }) }}
          />
        </FormControl>
      </div>
    );
  };

  /**
   * Component for rendering the Health Insurance Form.
   *
   * @returns {JSX.Element} - HealthInsuranceForm component.
   */

  const HealthInsuranceForm = () => {
    const userData = useUser()
    const [formData, setFormData] = useState({});
    const [userIdInput, setUserIdInput] = useState("");
    const [existingData, setExistingData] = useState(null);
    const [loading, setLoading] = useState(false);

    const regionOptions = [
      { value: "region a", label: "Region A" },
      { value: "region b", label: "Region B" },
      { value: "region c", label: "Region C" },
      { value: "region d", label: "Region D" },
    ];

    /**
     * Handle form data changes.
     *
     * @param {string} field - Field name in the form data.
     * @param {string|Object} value - Value to be set for the field.
     */

    const handleChange = (field, value) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [field]: value,
      }));
    };

    /**
     * Handle user ID input change.
     *
     * @param {Object} e - Input change event.
     */

    // const handleUserIdInput = (e) => {
    //   setUserIdInput(e.target.value);
    // };

    //  Handle saving the questionnaire data.
    const handleSave = () => {
      const formDataWithUserId = {
        ...formData,
        userId: userIdInput,
      };

      axios.post('http://localhost:5000/api/questionaire', formDataWithUserId, {
        headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}
    }).then((response) => {
          console.log("Form data submitted successfully:", response.data);
          toast.success("Questionnaire submitted successfully");
        })
        .catch((error) => {
          console.error("Error submitting form data:", error);
          toast.error("Error submitting form data");
        })
        .finally(() => {
          // setFormData({});
          setUserIdInput("");
          // After successful submission, you may want to clear existingData state as well
          // setExistingData(null);
        });
    };

    const handleLoadData = () => {
    
    
      setLoading(true);
    

        axios
          .get(`http://localhost:5000/api/questionaire`, {
            headers:{Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
          .then((response) => {
            const userHealthInsurance = response.data.data;
            if (userHealthInsurance) {
              setFormData(userHealthInsurance.insuranceData);
              toast.info("Data loaded successfully"); // Show toast here
            } else {
              setFormData({});
              toast.warn("No data found for the specified User ID");
            }
          })
          .catch((error) => {
            console.error("Error loading data:", error);
            toast.error("Error loading data");
          })
          .finally(() => {
            setLoading(false);
          });
      
    };
    
    useEffect(() => {
      if (userData) {
        handleLoadData();
      }
    }, [userData]);

    return (
      <>
        <ToastContainer position="top-right" />{" "}

        {/* 
          User Identification Section:
          The "Enter User ID" allows the user to input their User ID. The input field is linked to the handleUserIdInput function,
          and when a valid User ID is entered, the corresponding health insurance data is loaded using the handleLoadData function.
          If the user is logged in, their previous data will be populated in the input fields, enabling them to make changes.
        */}
        {/* <div className="flex items-center justify-between">
          <label className="text-white">Enter User ID:</label>
          <input
            type="text"
            value={userIdInput}
            onChange={handleUserIdInput}
            className="bg-gray-800 text-white p-2 rounded ml-auto"
          />
              </div> */}
          {/* <button
              onClick={handleLoadData}
              className="bg-white hover:bg-gray-300 text-gray-800 rounded-full px-4 py-2"
              >
              {loading ? "Loading..." : "Load Data"}
              </button> */}


        <ServiceQuestions
          questionTitle="Vaccination"
          handleChange={handleChange}
          additionalQuestionId="1"
          regionOptions={regionOptions}
          formData={formData}
        />
        <ServiceQuestions
          questionTitle="Skin Cancer predetection"
          handleChange={handleChange}
          additionalQuestionId="2"
          regionOptions={regionOptions}
          formData={formData}
        />
        <ServiceQuestions
          questionTitle="Hearing Ais"
          handleChange={handleChange}
          additionalQuestionId="3"
          regionOptions={regionOptions}
          formData={formData}
        />
        <ServiceQuestions
          questionTitle="Childbirth preparation course"
          handleChange={handleChange}
          additionalQuestionId="4"
          regionOptions={regionOptions}
          formData={formData}
        />
        <ServiceQuestions
          questionTitle="Childbirth"
          handleChange={handleChange}
          additionalQuestionId="5"
          regionOptions={regionOptions}
          formData={formData}
        />
        <div className="lg:w-2/3 mx-auto mb-12">
          <button
            onClick={handleSave}
            className="bg-white hover:bg-gray-300 text-gray-800 rounded-full"
            style={{ width: "700px", height: "55px" }} // Set your desired width here
          >
            Save Questionnaire
          </button>
        </div>
      </>
    );
  };

  export default HealthInsuranceForm;
