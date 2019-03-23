import React, { Component } from "react";
import { Layout, Input, notification, Card } from "antd";
import postCodeData from "./postcode-to-zones.json";
import electionData from "./election_data.json";
import "antd/dist/antd.css";
import "./App.css";

const imgPrefix = "https://election.longdo.com/party_logo/";

const { Header, Content } = Layout;
const Search = Input.Search;
const openNotificationWithIcon = type => {
  notification[type]({
    message: "Error",
    description: "หาเขคเลือกตั้งจากรหัสไปรษณีไม่เจออ่ะ"
  });
};
class App extends Component {
  state = {
    data: null
  };

  renderRandom = ({ province, zone }) => {
    const searchResult = electionData.data.find(e => {
      return e.province_name.th === province && zone === e.ward_no;
    }).candidate;
    const rendomResult =
      searchResult[Math.floor(Math.random() * searchResult.length)];
    return (
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ display: "flex" }}>
          <img
            alt="party"
            src={`${imgPrefix}${rendomResult.party_image_file_name}`}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "20px"
          }}
        >
          <h3>{`เบอร์ ${rendomResult.no}`}</h3>
          <h3>{`ชื่อ ${rendomResult.title} ${rendomResult.firstname} ${
            rendomResult.lastname
          }`}</h3>
          <h3>{`พรรค ${rendomResult.party_name}`}</h3>
        </div>
      </div>
    );
  };

  onSearchData = value => {
    const postcodeValue = postCodeData[value];
    if (!postcodeValue) {
      this.setState({ data: null });
      openNotificationWithIcon("error");
    }
    console.log(postcodeValue);
    this.setState({ data: postcodeValue });
  };
  render() {
    return (
      <div>
        <Layout>
          <Header style={{ display: "flex", justifyContent: "center" }}>
            <h1 style={{ color: "white" }}>แรนด้อมแมร่ง</h1>
          </Header>
          <Content
            style={{
              backgroundColor: "#e7e7e7",
              padding: "20px",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <div
              style={{
                backgroundColor: "#e7e7e7",
                width: "100%",
                maxWidth: "800px",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column"
              }}
            >
              <Search
                placeholder="ใส่รหัสไปรษณี"
                enterButton="Search"
                size="large"
                onSearch={value => this.onSearchData(value)}
              />
              <p>*นำขอมูลมาจาก longdo.com และ elect.in.th</p>
              {this.state.data ? (
                this.state.data.zones.map(zone => (
                  <Card
                    title={`${zone.province} เขต ${zone.zone}`}
                    bordered={false}
                    style={{ margin: "20px" }}
                  >
                    {zone.areas.map(area => (
                      <p>{`${area.area} ${
                        area.interior.length === 0 ? "" : ":"
                      } ${area.interior.join(",")}`}</p>
                    ))}
                    <h2>ผลการแรนด้อม</h2>
                    {this.renderRandom({
                      province: zone.province,
                      zone: zone.zone
                    })}
                  </Card>
                ))
              ) : (
                <div />
              )}
            </div>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
