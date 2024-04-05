"use client";
import "../../public/customcss/style.css";
import { useEffect, useState } from "react";
import User from "../../model/User";
import UserModal from "../../components/Usermodal";
import { Button, FloatingLabel, Form, Row } from "react-bootstrap";
import Image from "next/image";

export default function Page() {
  const [useData, setUserData] = useState<User[]>([]);
  const [minAge, setMinAge] = useState<number>(1);
  const [maxAge, setMaxAge] = useState<number>(100);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://randomuser.me/api/?page=${currentPage}&results=12&seed=abc`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setUserData(data.results);
        console.log(data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [currentPage]);

  const filteredUsers = useData.filter(
    (user) => user?.dob["age"] >= minAge && user?.dob["age"] <= maxAge
  );

  return (
    <div className="container">
      <h1 className="title-head">Random Users</h1>
      <div className="block-filter">
        <div className="inner-filter">
          <p className="filter-label">filter</p>
          <div className="box-input-filter">
            <div className="age-filter">
              <FloatingLabel controlId="floatingInputGrid" label="Min Age:">
                <Form.Control
                  type="number"
                  value={minAge}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (!isNaN(value) && value >= 1) {
                      setMinAge(value);
                    }
                  }}
                />
              </FloatingLabel>
            </div>
            <div className="age-filter">
              <FloatingLabel controlId="floatingInputGrid" label="Max Age:">
                <Form.Control
                  type="number"
                  value={maxAge}
                  maxLength={150}
                  onChange={(e) => {
                    setMaxAge(parseInt(e.target.value));
                  }}
                />
              </FloatingLabel>
            </div>
          </div>
        </div>
      </div>
      <div className="block-use-list">
        {filteredUsers.map((user, index) => (
          <div className="user-item" key={`user-${index}`}>
            <div className="inner-item">
              <div className="box-image">
                <Image
                  src={user?.picture["medium"]}
                  width={100}
                  height={100}
                  alt="avater"
                />
              </div>
              <div className="user-detail">
                <p className="intro-detail">
                  name : {user?.name["first"]} {user?.name["last"]}
                </p>
                <p className="intro-detail"> age : {user?.dob["age"]}</p>
                <p className="intro-detail"> gender : {user?.gender}</p>
                <p className="intro-detail"> {user?.email}</p>
                <UserModal user={user} />
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredUsers.length >= 12 && (
        <div className="box-pagination">
          {currentPage >= 1 && (
            <Button onClick={() => handlePageChange(currentPage - 1)}>
              Previous
            </Button>
          )}
          <Button onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
