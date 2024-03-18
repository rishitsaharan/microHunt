// linkWebsite : body.linkWebsite,
// codeName : body.codeName,
// punchline : body.punchline,
// description : body.description,
// moreInfo : body.moreInfo,
// logoFileUrl : body.logoFile,
// typeOfProduct : body.typeOfProduct,
// productCategory : body.productCategory,
// typeCommercialOffer : body.typeCommercialOffer,
// tags : body.tags,
// launchDate : body.launchDate,
// productDevelopmentStage : body.productDevelopmentStage,
// finalNotes : body.finalNotes

export const ProductRegister = () => {
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
                    <input type="text" className="mb-2 max-w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Link to your Product Website" required />
                    <input type="text" className="mb-2 max-w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Your Product's Codename" required />
                    <input type="text" className="mb-2 max-w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Your Product's PunchLine (<10  words)" required />
                    <input type="text" className="mb-2 max-w-2xl h-24 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="A short description here (~70 words)" required />
                </div>
            </div>
            <div>
                <div className="font-bold text-lg mt-4 mb-2">
                    More Informations (optional)
                </div>
                <div>
                    <input type="text" className="mb-2 max-w-2xl h-24 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="A Longer description here" />
                </div>
            </div>
            <div>
                <div className="font-bold text-lg mt-4 mb-2">
                    Logo file(.svg or .png, 128x128)
                </div>
                <div>
                    <input type="text" className="mb-2 max-w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Logo file URL" required />
                </div>
            </div>
            <div>
                <div className="font-bold text-lg mt-4 mb-2">
                    Type of Product
                </div>
                <div>
                    <select className="mb-2 max-w-72 h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option selected>Choose your Product's Type</option>
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
                    <select className="mb-2 max-w-72 h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option selected>Choose your Commerical Offer</option>
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
                    <input type="text" className="mb-2 max-w-2xl h-24 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="One tag per line, maximum 10" />
                </div>
            </div>
            <div>
                <div className="font-bold text-2xl mb-4">
                    B. When would you ideally launch your product?
                </div>
                <div>
                    <input type="text" className="mb-2 max-w-72 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Approx Launch date (DD/MM/YYYY)" required />
                </div>
            </div>
            <div>
                <div className="font-bold text-lg mt-4 mb-2">
                    Your Product Development Stage at the moment of micro Launch
                </div>
                <div>
                    <select className="mb-2 max-w-72 h-10 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option selected>Choose your Product's Devlopement Stage</option>
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
                    <input type="text" className="mb-2 max-w-2xl h-24 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Extra notes to the team, fields you're unsure about" />
                </div>
            </div>
            <div>
                <div className="flex items-center mb-4">
                    <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                    <label className="ms-2 text-md font-medium text-gray-900">I'm allowed to showcase a product on behalf of this company</label>
                </div>
                <div className="flex items-center mb-4">
                    <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500" />
                    <label className="ms-2 text-md font-medium text-gray-900">I agree to the terms and conditions and understand that my data will be processed for product registration purposes. I acknowledge that I can unsubscribe at any time without any obligation. For more information on how my data will be handled, I will review the privacy policy.</label>
                </div>
            </div>
        </div>
    </div>
}