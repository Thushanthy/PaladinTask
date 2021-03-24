import { useEffect, useState } from 'react';
import { FaBriefcase, FaClock, FaGlobeAmericas } from "react-icons/fa";
import './App.css';

function App() {

  const [resourceType, SetResourceType] = useState(1)
  const [items, SetItems] = useState([])

  useEffect(() => {
    fetch('https://api.rooster.jobs/core/public/jobs')
      .then(responce => responce.json())
      .then(json => {
        Shuffle(json.body.results);
        SetItems(json.body.results);
      })
  }, [resourceType])

  //function for shuffling responce randomly.
  function Shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  return (
    <div className="App">
      <div className="container">
        <button className="header_btn" onClick={() => SetResourceType(Math.random() + 1)}>Shuffle Jobs</button>
        {items.map(item => {
          return <div className="main_list" key={item.id}>
            <div className="wrapper">
              <div className="poster">
                <div className="row">
                  <div className="col-1">
                    {item.company.logo_url ? (
                      <img src={item.company.logo_url} alt="logo" />
                    ) : (
                      <div></div>
                    )}
                  </div>
                  <div className="col-11 ">
                    <div className="row">
                      <div className="col-8 poster_title">
                        {item.title}
                      </div>
                      <div className="col-4 days">
                        <FaClock /><span>{Math.floor((Date.parse(new Date) - Date.parse(item.updated_at)) / 86400000)} days ago</span>
                      </div>
                    </div>
                    <div className="vender">
                      {item.company.name}
                    </div>
                    <div className="description">
                      {item.subclass}
                    </div>
                    <div className="row foot">
                      <div className="col-3">
                        <FaBriefcase /><span>{item.job_type}</span>
                      </div>
                      <div className="col-9">
                        <FaGlobeAmericas /><span>{item.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        })}
      </div>
    </div>
  );
}

export default App;
