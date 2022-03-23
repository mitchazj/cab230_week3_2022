import { useState } from "react";
import "./styles.css";

// const hardcoded_data = {
//   data: {
//     id: 2,
//     email: "janet.weaver@reqres.in",
//     first_name: "Janet",
//     last_name: "Weaver",
//     avatar: "https://reqres.in/img/faces/2-image.jpg"
//   },
//   support: {
//     url: "https://reqres.in/#support-heading",
//     text:
//       "To keep ReqRes free, contributions towards server costs are appreciated!"
//   }
// };

// This is just a value so we know what we start at
const initial_value = 0;

// These are functions that do pure math
// and aren't related to react at all
const addOneToANumber = (number) => number + 1;
const takeOneFromANumber = (number) => number - 1;
const addTenToANumber = (number) => number + 10;

const fetchUserInformation = () => {
  return (
    fetch("https://reqres.in/api/users/2")
      .then((res) => res.json()) // <-- this is the simple way
      // .then((res) => {        // <-- to do this
      //   console.log(res);
      //   return res.json();
      // })
      .then((res_json) => res_json.data)
  );
};

function LoadUsersAndShowThem() {
  const [user, setUser] = useState(null);

  const handleButtonClick = () => {
    fetchUserInformation().then((information) => setUser(information));
  };

  return (
    <div>
      {user ? <DisplayUser {...user} /> : null}
      <button onClick={handleButtonClick}>Load Users</button>
    </div>
  );
}

function DisplayUser({ avatar, email, first_name, last_name }) {
  return (
    <div>
      <img src={avatar} alt={first_name} />
      <h3>
        {first_name} {last_name}
      </h3>
      <p>{email}</p>
    </div>
  );
}

function Headline(props) {
  return (
    <h1>
      {props.text} - {props.week}
    </h1>
  );
}

function LikeCounter() {
  const [like, setLike] = useState(initial_value);
  const [noOfSuperlikes, setNoOfSuperlikes] = useState(initial_value);

  const handleLike = () => setLike(addOneToANumber);
  const handleDislike = () => setLike(takeOneFromANumber);
  const handleSuperlike = () => {
    if (noOfSuperlikes < 2) {
      setLike(addTenToANumber);
      setNoOfSuperlikes(addOneToANumber);
    } else {
      console.log("You can only superlike twice");
    }
  };

  return (
    <div>
      <Headline text="CAB230" week="Week 3" />
      <h2>Number of likes: {like}</h2>
      <button onClick={handleLike}>Like</button>
      <button onClick={handleSuperlike}>Super Like</button>
      <button onClick={handleDislike}>Dislike</button>
    </div>
  );
}

// This is the React Component
export default function App() {
  // This console log statement lets us see when the component
  // updates
  // console.log(`hello, I rendered at ${new Date()}`);

  // These functions iare what we attach to our buttons' onClick method
  // and we can see that it passes a math function to 'setLike'
  // so that 'like' is set (on the next render) to be whatever
  // the result of putting like into the math function is
  // const handleLike = () => {
  //   setLike(addOneToANumber);
  // };
  // const handleDislike = () => {
  //   setLike(takeOneFromANumber);
  // };

  // The JSX that creates our DOM
  return (
    <div className="App">
      {/* <DisplayUser
        avatar={hardcoded_data.data.avatar}
        email={hardcoded_data.data.email}
        first_name={hardcoded_data.data.first_name}
        last_name={hardcoded_data.data.last_name}
      /> */}
      <LoadUsersAndShowThem />
      <LikeCounter />
    </div>
  );
}
