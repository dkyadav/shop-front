import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import { updateName } from "../store/reducers/user.reducer";

export default function Profile() {

    const profile = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [showeditName,setShoweditName] = useState(0);
    const [showeditEmail,setShoweditEmail] = useState(0);

    const [uname,setUname] = useState(profile.name);

    return (
        <>
            <h1>Profile</h1>
            <h3>Name: {profile.name} | {profile.email}</h3>
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
                                    setShoweditName(!showeditName)} 
                                }>
                                    Save</button>
                        </>

                }
            </h3>
            {/* 
            <h3>Email:
                {
                    !showeditemail ?
                        <>
                            {email}
                            <button onClick={() => setShoweditemail(!showeditemail)}>Edit</button>
                        </>
                        :
                        <>
                            <input type="text" name="email_txt" onChange={(event) => setEmail(event.target.value)} value={email} />
                            <button onClick={(event) => { setShoweditemail(!showeditemail); changeEmail('email', email) }}>Save</button>
                        </>
                }
            </h3>
            <h3>Phone:
                {
                    !showeditphone ?
                        <>
                            {phone}
                            <button onClick={() => setShoweditphone(!showeditphone)}>Edit</button>
                        </>
                        :
                        <>
                            <input type="text" name="phone_txt" onChange={(event) => setPhone(event.target.value)} value={phone} />
                            <button onClick={(event) => handleClick(event, 'phone', phone)}>Save</button>
                        </>
                }
            </h3> */}
        </>
    )
};