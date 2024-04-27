import React from "react";

const Address = ()=>{
    const egyptGovernorates = [
        "القاهرة",
        "الإسكندرية",
        "الجيزة",
        "المنوفية",
        "القليوبية",
        "الشرقية",
        "الغربية",
        "المنيا",
        "الفيوم",
        "أسيوط",
        "سوهاج",
        "قنا",
        "الأقصر",
        "أسوان",
        "البحيرة",
        "دمياط",
        "بورسعيد",
        "الإسماعيلية",
        "السويس",
        "كفر الشيخ",
        "مطروح",
        "الوادي الجديد",
        "شمال سيناء",
        "جنوب سيناء",
        "البحر الأحمر",
        "الدقهلية",
        "قناة السويس"
      ];
    return (
        <div className="address-form">
          <div className="navigation">
            <span>Information</span>
            <span>orders</span>
            <span className="active">address</span>
          </div>
          <form>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input type="text" id="username" placeholder="Username" />
            </div>
            <div className="form-group">
              <label htmlFor="government">Government:</label>
              <select id="government" defaultValue="">
                <option value="" disabled>
                  Select Government
                </option>
               
                {
                    egyptGovernorates.map( (index)=>{
                        return(
                            <option key={index} value={index}>{index}</option>
                        )
                    })
                }
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input type="text" id="city" placeholder="City" />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <textarea id="address" placeholder="Address" rows="3"></textarea>
            </div>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>
      );
}

export default Address