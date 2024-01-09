"use client";
import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Sidebar from "../components/Sidebar";
import IlluStyles from "./components/IlluStyles";
import ColorModeSelector from "./components/ColorModeSelector";
import IlluTypeSelector from "./components/IlluTypeSelector";
import StepIndicator from "./components/StepIndicator";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { generateImage } from "../utils/illustroke";
import { db, auth, storage, provider } from "../firebase/initFirebase";
import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import fetchUserData from "../firebase/fetchUserData";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

const Page = () => {
  const [step, setStep] = useState(1);
  const [currentStep, setCurrentStep] = useState(2);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    promptText: "",
    category: "common",
    illuStyle: [],
    colorMode: "color",
    objectMode: "full",
    n: 1,
    visibility: "public",
  });
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Checks if user is logged in with auth state change detection
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user.uid).then((data) => setUser(data));
        setUserId(user.uid);
      }

      // If not logged in, redirect the user to main page
      else {
        router.push("/");
      }
    });

    // Removes event listner when component gets unmounted
    return () => unsubscribe();
  }, [router]);

  const editMode = false;

  const handleNext = () => {
    // Check if prompt is empty
    if (step === 1 && !userInput.promptText.trim()) {
      alert("You must type a text to create illustration!");
      return;
    }
    if (step === 2 && userInput.illuStyle.length < 1) {
      alert("You must choose more than one style!");
      return;
    }
    setStep((prevStep) => prevStep + 1);
    if (step > 1 && step < 5) {
      setCurrentStep((step) => step + 1);
    }
  };

  const handleStepChange = (newCurrStep) => {
    setCurrentStep(newCurrStep);
    setStep(newCurrStep);
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
    if (step > 1 && step <= 5) {
      setCurrentStep((step) => step - 1);
    }
  };

  // Change user's prompt input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Change user's style category
  const handleSelectedCategory = (selectedCategory) => {
    setUserInput((prevInput) => ({
      ...prevInput,
      category: selectedCategory,
    }));
  };

  // Change user's illustration style
  const handleSelectedStyleChange = (selectedStyle) => {
    setUserInput((prevInput) => ({
      ...prevInput,
      illuStyle: selectedStyle,
    }));
  };

  // Change user's color Mode
  const handleColorModeChange = (selectedColorMode) => {
    setUserInput((prevInput) => ({
      ...prevInput,
      colorMode: selectedColorMode,
    }));
  };

  // Change user's object mode
  const handleObjectModeChange = (selectedObjectMode) => {
    setUserInput((prevInput) => ({
      ...prevInput,
      objectMode: selectedObjectMode,
    }));
  };

  // Change user's color variant
  const handleVariantChange = (selectedNum) => {
    setUserInput((prevInput) => ({
      ...prevInput,
      n: selectedNum,
    }));
  };

  // Change user's visibility mode
  const handleVisibilityChange = (visibleRange) => {
    setUserInput((prevInput) => ({
      ...prevInput,
      visibility: visibleRange,
    }));
  };

  const handleEditPrompt = () => {
    // Redirect to first step for prompt
    setStep(1);
  };

  const createImage = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await generateImage(
        userInput.illuStyle[0],
        userInput.promptText,
        userInput.objectMode,
        userInput.colorMode,
        userInput.n
      );

      const svgString = await result.text();
      const svgMatchArray = svgString.match(/<svg.*<\/svg>/);
      const cleanedSvgStr = svgMatchArray[0].replace(/\\/g, "");

      const blob = new Blob([cleanedSvgStr], { type: "image/svg+xml" });

      const imageRef = ref(
        storage,
        "gs://meechelangelo-a76e3.appspot.com/" +
          userInput.promptText.replace(" ", "_") +
          ".svg"
      );

      await uploadBytes(imageRef, blob);

      const imageURL = await getDownloadURL(imageRef);

      //const imageURL = await saveIllustration("user1", svgString);

      setImageUrl(imageURL);

      await setDoc(doc(collection(db, "users", userId, "illustrations")), {
        imagePrompt: userInput.promptText,
        style: userInput.illuStyle,
        color: userInput.colorMode,
        visible: userInput.visibility,
        img_url: imageURL,
        created_at: Timestamp.now(),
      });

      /*
      const svgString2 = await result.text();
      
      const svgString3 = svgString2.match(/<svg.*<\/svg>/);

      const cleanedSvgStr = svgString3[0].replace(/\\/g, "");

      const svgData = cleanedSvgStr;

      const blob = new Blob([svgData], { type: "image/svg+xml" });

      const url = URL.createObjectURL(blob);

      setImageUrl(url);

      console.log(url);

      await addDoc(collection(db, "testData", "users"), {
        img_url: url,
      });

      return () => URL.revokeObjectURL(url);*/
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setLoading(false);
    } /*
    await setDoc(doc(collection(db, "testData"), "users"), {
      uid: userInput.n,
      imagePrompt: userInput.promptText,
      color: userInput.colorMode,
      visible: userInput.visibility,
      img_url:imageUrl,
    });*/
  };

  return (
    <>
      <Nav />
      <div className="min-h-screen">
        <Sidebar />
        {step > 1 && (
          <>
            <div className="flex justify-center items-center w-full h-14 bg-gray-400 px-4">
              <input
                name="promptText"
                onChange={handleChange}
                className="bg-gray-400 w-1/2 text-center text-white text-base"
                value={userInput.promptText}
              />
              <span className="absolute right-5">
                <button>
                  <FontAwesomeIcon icon={faPencil} size="1x" />
                </button>
              </span>
            </div>
            <div className="mt-10">
              <StepIndicator
                currStep={currentStep}
                onStepChange={handleStepChange}
              />
            </div>
          </>
        )}
        {step === 1 && (
          <div className="max-[639px]:text-center md:absolute md:top-48 md:left-1/3 space-y-10">
            <h1 className="mt-5 font-bold text-xl md:mt-0 md:text-3xl">
              Describe your illustration
            </h1>
            <input
              name="promptText"
              value={userInput.promptText}
              onChange={handleChange}
              placeholder="Ex: A smiling face of a old woman"
              className="max-[639px]:mx-auto border border-solid w-full pl-5 max-w-xs md:max-w-2xl p-3 rounded-full"
              formNoValidate
            />
            <button
              className="p-3 bg-blue-500 text-white rounded-full"
              onClick={handleNext}
            >
              Create illustration
            </button>
          </div>
        )}

        {step === 2 && (
          <>
            <div className="max-[639px]:text-center md:absolute md:top-56 md:left-1/3 space-y-10">
              <h1 className="mt-5 font-bold text-xl md:mt-0 md:text-3xl">
                Choose the illustration style
              </h1>
              <div className="max-[639px]:justify-center md:flex md:relative md:-left-10">
                <IlluStyles
                  selectedCategory={userInput.category}
                  setSelectedCategory={handleSelectedCategory}
                  selectedStyle={userInput.illuStyle}
                  setSelectedStyle={handleSelectedStyleChange}
                />
              </div>
              <div className="col-span-2 max-[640px]:space-x-14">
                <button onClick={handleBack} className="text-blue-500">
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="bg-blue-500 px-5 py-3 rounded-full text-white md:absolute md:right-16 md:-mt-3"
                >
                  Continue
                </button>
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <div className="max-[639px]:text-center md:absolute md:top-56 md:left-1/3 space-y-10">
            <h1 className="mt-5 font-bold text-xl md:mt-0 md:text-3xl">
              Choose the color mode
            </h1>
            <div className="max-[639px]:justify-center md:flex md:relative">
              <ColorModeSelector
                colorMode={userInput.colorMode}
                setColorMode={handleColorModeChange}
              />
            </div>
            <div className="col-span-2 max-[640px]:space-x-14">
              <button onClick={handleBack} className="text-blue-500">
                Back
              </button>
              <button
                onClick={handleNext}
                className="bg-blue-500 px-5 py-3 rounded-full text-white md:absolute md:right-16 md:-mt-3"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="max-[639px]:text-center md:absolute md:top-56 md:left-1/3 space-y-10">
            <h1 className="mt-5 font-bold text-xl md:mt-0 md:text-3xl md:-ml-2">
              Choose the illustration type
            </h1>
            <div className="max-[639px]:justify-center md:flex md:relative">
              <IlluTypeSelector
                objectMode={userInput.objectMode}
                setObjectMode={handleObjectModeChange}
                variant={userInput.n}
                setVariant={handleVariantChange}
                visible={userInput.visibility}
                setVisible={handleVisibilityChange}
              />
            </div>
            <div className="col-span-2 max-[640px]:space-x-14">
              <button onClick={handleBack} className="text-blue-500">
                Back
              </button>
              <button
                onClick={handleNext}
                className="bg-blue-500 px-5 py-3 rounded-full text-white md:absolute md:right-16 md:-mt-3"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="max-[639px]:text-center md:absolute md:top-56 md:left-1/3 space-y-10">
            <h1 className="mt-5 font-bold text-xl md:mt-0 md:text-3xl">
              Final Review
            </h1>
            <div className="max-[639px]:justify-center md:flex md:relative">
              <div className="flex flex-col space-y-10">
                <p>Confirm your input below:</p>
                <p>Prompt: {userInput.promptText}</p>
                <p>Style: {userInput.illuStyle}</p>
                <p>Color Mode: {userInput.colorMode}</p>
                <p>Object Mode: {userInput.objectMode}</p>
                <p>Number of Color Variants: {userInput.n}</p>
                <p>Illustration Visibility: {userInput.visibility}</p>
              </div>
            </div>
            <div className="col-span-2 max-[640px]:space-x-14">
              <button onClick={handleBack} className="text-blue-500">
                Back
              </button>
              <button
                onClick={createImage}
                className="bg-blue-500 px-5 py-3 rounded-full text-white md:absolute md:-right-full md:-mt-3"
              >
                Yes, Create
              </button>
            </div>
            {loading && (
              <div className="flex justify-end items-end">
                <p className="text-base">Creating now....</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
