import React, { Component } from "react";
import "./Home.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Wrapper from "../../components/Wrapper";

class Home extends Component {

    state = {

    }

    render(){
        return(
            <Wrapper>
                <Header/>
                <Footer/>
            </Wrapper>
        )
    }

}

export default Home;