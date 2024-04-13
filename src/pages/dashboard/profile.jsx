import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom";
import { updateEmail, updateName, updatePhone } from "../../store/reducers/user.reducer";
import NavigationDashboard from "./dashboard_nav";

export default function Profile() {

    const profile = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [showeditName, setShoweditName] = useState(0);
    const [showeditEmail, setShoweditEmail] = useState(0);
    const [showeditPhone, setShoweditPhone] = useState(0);

    const [uname, setUname] = useState(profile.name);
    const [email, setEmail] = useState(profile.email);
    const [phone, setPhone] = useState(profile.phone);

    return (
        <>
            <NavigationDashboard />
            <div className="innerDiv">
                <h1>Profile</h1>
                <h3>Name:
                    {
                        !showeditName ?
                            <>
                                {profile.name}
                                <button onClick={() => setShoweditName(!showeditName)}>Edit</button>
                            </>
                            :
                            <>
                                <input type="text" onChange={(event) => setUname(event.target.value)} value={uname} />
                                {/* <button onClick={(event) => handleClick(event, 'name', uname)}>Save</button> */}
                                <button onClick={
                                    (event) => {
                                        dispatch(updateName(uname));
                                        setShoweditName(!showeditName)
                                    }
                                }>
                                    Save</button>
                            </>

                    }
                </h3>

                <h3>Email:
                    {
                        !showeditEmail ?
                            <>
                                {profile.email}
                                <button onClick={() => setShoweditEmail(!showeditEmail)}>Edit</button>
                            </>
                            :
                            <>
                                <input type="text" name="email_txt" onChange={(event) => setEmail(event.target.value)} value={email} />
                                <button onClick={(event) => { setShoweditEmail(!showeditEmail); dispatch(updateEmail(email));}}>Save</button>
                            </>
                    }
                </h3>
                <h3>Phone:
                    {
                        !showeditPhone ?
                            <>
                                {profile.phone}
                                <button onClick={() => setShoweditPhone(!showeditPhone)}>Edit</button>
                            </>
                            :
                            <>
                                <input type="text" name="phone_txt" onChange={(event) => setPhone(event.target.value)} value={phone} />
                                <button onClick={
                                    (event) => {
                                        setShoweditPhone(!showeditPhone); 
                                        dispatch(updatePhone(phone));
                                    }
                                }>Save</button>
                            </>
                    }
                </h3>
            </div>
        </>
    )
};