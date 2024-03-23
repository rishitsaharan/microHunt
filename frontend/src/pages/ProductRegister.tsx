import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { productInputType } from "@rishit.saharan/microhunt-app";
import { useNavigate } from "react-router-dom";

export const ProductRegister = () => {
    const navigate = useNavigate();

    function checkIsAuthenticated() {
        if (!localStorage.getItem("token")) {
            alert("You'll have to login first.");
            navigate("/signin");
        }
    }
    useEffect(() => {
        checkIsAuthenticated();
    }, []);


    const [linkWebsite, setLinkWebsite] = useState("");
    const [codeName, setCodeName] = useState("");
    const [punchline, setPunchline] = useState("");
    const [description, setDescription] = useState("");
    const [moreInfo, setMoreInfo] = useState("");
    const [logoFileUrl, setLogoFileUrl] = useState("");
    const [typeOfProduct, setTypeOfProduct] = useState("");
    const [typeCommercialOffer, setTypeCommercialOffer] = useState("");
    const [tags, setTags] = useState("");
    const [launchDate, setLaunchDate] = useState("");
    const [productDevelopmentStage, setProductDevelopmentStage] = useState("");
    const [finalNotes, setFinalNotes] = useState("");
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);

    async function handleSubmit(){
        const tagsArray = tags.split(`\n`);
        const requestBody : productInputType = {
            linkWebsite : linkWebsite,
            codeName : codeName,
            punchline : punchline,
            description : description,
            moreInfo : moreInfo,
            logoFileUrl : logoFileUrl,
            typeOfProduct : typeOfProduct,
            typeCommercialOffer : typeCommercialOffer,
            tags : tagsArray,
            launchDate : launchDate,
            productDevelopmentStage : productDevelopmentStage,
            finalNotes : finalNotes
        };
        const response = await axios.post(`${BACKEND_URL}/api/v1/product/`, requestBody, {
            headers: {
                Authorization: `Bearer ` + localStorage.getItem("token")
            }
        });

        navigate(`/${response.data.productId}`);
        return;
    };
    function validateForm() {
        const requiredInputs = document.querySelectorAll('input[required], select[required]');
        let isValid = true;
        let isChecked = true;
        requiredInputs.forEach(input => {
            if (input instanceof HTMLInputElement) {
                if (input.type === 'checkbox') {
                    if (!input.checked) { 
                        isChecked = false;
                    } 
                }
                else{
                    if (!input.value.trim()) { 
                        isValid = false;
                        input.classList.add('border-red-500'); 
                    } 
                    else {
                        input.classList.remove('border-red-500'); 
                    }
                }
            }
            else if(input instanceof HTMLSelectElement){
                if (input.value.trim() == "") { 
                    isValid = false;
                    input.classList.add('border-red-500'); 
                } else {
                    input.classList.remove('border-red-500'); 
                }
            }
    });
    
        if(!isChecked){
            alert("Please tick the checkboxes.");
            return;
        }
        if (!isValid) {
            alert('Please fill in all required fields.');
            return; 
        }
        

        return handleSubmit(); // Return true if all required fields are filled, false otherwise
    }

    return <div className="flex justify-center bg-blue-50">
        <div className=" w-3/5 mt-20">
            <div className="font-extrabold text-6xl mb-10 text-center">
                Micro Launch - New Product Form
            </div>
            <div className="text-xl mb-7">
                Welcome to the MicroLaunch product registration form. Please fill in the information below so we can review your product application. Feel free to reach out to us directly at X (@MicroLaunchHQ) if you need any assistance. Cheers, let's go🚀
            </div>
            <div>
                <div className="font-bold text-2xl mb-4">
                    A. Tell us more about your product
                </div>
                <div>
                    <input value={linkWebsite} onChange={(e) => setLinkWebsite(e.target.value)} type="text" className="mb-2 max-w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Link to your Product Website" required />
                    <input value={codeName} onChange={(e) => setCodeName(e.target.value)} type="text" className="mb-2 max-w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Your Product's Codename" required />
                    <input value={punchline} onChange={(e) => setPunchline(e.target.value)} type="text" className="mb-2 max-w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Your Product's PunchLine (<10  words)" required />
                    <textarea rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="A short description here ~70 words"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                </div>
            </div>
            <div>
                <div className="font-bold text-lg mt-4 mb-2">
                    More Informations (optional)
                </div>
                <div>
                <textarea rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="A longer description here"
                            value={moreInfo}
                            onChange={(e) => setMoreInfo(e.target.value)}
                        ></textarea>
                </div>
            </div>
            <div>
                <div className="font-bold text-lg mt-4 mb-2">
                    Logo file(.svg or .png, 128x128)
                </div>
                <div>
                    <input value={logoFileUrl} onChange={(e) => setLogoFileUrl(e.target.value)} type="text" className="mb-2 max-w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Logo file URL" required />
                </div>
            </div>
            <div>
                <div className="font-bold text-lg mt-4 mb-2">
                    Type of Product
                </div>
                <div>
                    <select required defaultValue="" onChange={(e) => setTypeOfProduct(e.target.value)} className="mb-2 max-w-72 h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value="">Choose your Product's Type</option>
                        <option value="Saas">Saas</option>
                        <option value="AI Assistant">AI Assistant</option>
                        <option value="Web Tool/App">Web Tool/App</option>
                        <option value="Browser Extension">Browser Extension</option>
                        <option value="Mobile App">Mobile App</option>
                        <option value="Desktop App">Desktop App</option>
                        <option value="Dapp/Web3 Product">Dapp/Web3 Product</option>
                        <option value="DHardware DeviceE">Hardware Device</option>
                        <option value="Info product, Newsletters, Communities">Info product, Newsletters, Communities</option>
                        <option value="Directory, Store or Marketplace">Directory, Store or Marketplace</option>
                    </select>
                </div>
            </div>
            <div>
                <div className="font-bold text-lg mt-4 mb-2">
                    Type of Commerical Offer
                </div>
                <div>
                    <select required defaultValue="" onChange={(e) => setTypeCommercialOffer(e.target.value)} className="mb-2 max-w-72 h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value="">Choose your Commerical Offer</option>
                        <option value="Subscription">Subscription</option>
                        <option value="Lifetime Deal">Lifetime Deal</option>
                        <option value="Free Product">Free Product</option>
                        <option value="One-time payments">One-time payments</option>
                    </select>
                </div>
            </div>
            <div>
                <div className="font-bold text-lg mt-4 mb-2">
                   Extra tags for your product
                </div>
                <div>
                <textarea rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="One tag per line, maximum 2"
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                        ></textarea>
                </div>
            </div>
            <div>
                <div className="font-bold text-2xl mb-4">
                    B. When would you ideally launch your product?
                </div>
                <div>
                    <input value={launchDate} onChange={(e) => setLaunchDate(e.target.value)} type="text" className="mb-2 max-w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Approx Launch date (DD/MM/YYYY)" required />
                </div>
            </div>
            <div>
                <div className="font-bold text-lg mt-4 mb-2">
                    Your Product Development Stage at the moment of micro Launch
                </div>
                <div>
                    <select required defaultValue="" onChange={(e) => setProductDevelopmentStage(e.target.value)}className="mb-2 max-w-72 h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value="">Choose your Product's Devlopement Stage</option>
                        <option value="MVP in progress">MVP in progress</option>
                        <option value="MVP is ready">MVP is ready</option>
                        <option value="Looking first Customers">Looking first Customers</option>
                        <option value="Growing Customers base">Growing Customers base</option>
                        <option value="Established">Established</option>
                    </select>
                </div>
            </div>
            <div>
                <div className="font-bold text-2xl mb-4">
                    C. Final Notes
                </div>
                <div>
                <textarea rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Extra notes to the team, you're unsure about"
                            value={finalNotes}
                            onChange={(e) => setFinalNotes(e.target.value)}
                        ></textarea>
                </div>
            </div>
            <div>
                <div className="flex items-center mb-4">
                    <input required checked={isChecked1} onChange={(e) => setIsChecked1(!isChecked1)}id="default-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                    <label className="ms-2 text-md font-medium text-gray-900">I'm allowed to showcase a product on behalf of this company</label>
                </div>
                <div className="flex items-center mb-4">
                    <input required checked={isChecked2} onChange={(e) => setIsChecked2(!isChecked2)} id="default-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                    <label className="ms-2 text-md font-medium text-gray-900">I agree to the terms and conditions and understand that my data will be processed for product registration purposes. I acknowledge that I can unsubscribe at any time without any obligation. For more information on how my data will be handled, I will review the privacy policy.</label>
                </div>
            </div>
            <div>
                <button onClick = {validateForm} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Submit
                </button>
            </div>
        </div>
    </div>
}