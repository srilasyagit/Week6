import React, { useState, useEffect } from 'react';

const Facultycard = ({ faculty }) => {
  return (
    <div className="col-md-4 mb-3">
      <div className="card">
        <div className="card-body">
          <img className="card-image" src={faculty.ImageUrl} alt={faculty.Name} />
          <h5 className="card-title">{faculty.Name}</h5>
          <p className="card-text">Qualification:<br /> {faculty.Qualification}</p>
          <p className="card-text">Position:<br /> {faculty.Position}</p>
          <p className="card-text">Experience: <br />{faculty.Experience}</p>
        </div>
      </div>
    </div>
  );
};

const Faculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await fetch("https://gvaralaxmi.github.io/vara/csvjson.json");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setFaculty(data);
      } catch (error) {
        console.error('Error fetching faculty data:', error);
      }
    };
    fetchFaculty();
  }, []);

  const filteredData = faculty.filter(faculty =>
    faculty.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const pageStyle = {
    backgroundColor: 'brown', // Set the background color to brown
  };

  return (
    <div className="container-fluid" style={pageStyle}>
      <div className="row text-center">
        <div className="col-md-4">
          Search Faculty: &nbsp;
          <input type="text" onChange={handleSearch} />
        </div>
      </div>
      <div className="row mt-3">
        {filteredData.map((faculty, index) => (
          <Facultycard key={index} faculty={faculty} />
        ))}
      </div>
    </div>
  );
};

export default Faculty;
