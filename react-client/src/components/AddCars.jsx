import React, { Component } from 'react';
import axios from "axios";


export default class AddCars extends Component {
    constructor(props) {
        super(props);


        this.onChangeBrand = this.onChangeBrand.bind(this);
        this.onChangeYear = this.onChangeYear.bind(this);
        this.onChangeColour = this.onChangeColour.bind(this);
        // this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
          brand: "all",
          year : "2007",
          colour : "black"
        // price : "jjj",
        // description :""
        }

      }

      onChangeBrand(event) {
        this.setState({
         brand : event.target.value
        });
        //console.log(this.state.brand)
      }

      onChangeYear(event) {
        this.setState({
         year : event.target.value
        });
        //console.log(this.state.year)
      }

      onChangeColour(event) {
        this.setState({
         colour : event.target.value
        });
        //console.log(this.state.colour)
      }

    //   onChangePrice(event) {
    //     this.setState({
    //      price : event.target.value
    //     });
    //   }

      onChangeDescription(event) {
        this.setState({
         description : event.target.value
        });
        //console.log(this.state.description)
      }


      onSubmit(event) {
        event.preventDefault();
        const carInfo = {
          brand : this.state.brand,
          year : this.state.year,
          colour : this.state.colour,
        //   price : this.state.price,
          // description : this.state.description
        }
        console.log(carInfo);
        // console.log(this.state.brand);

        axios.post("http://localhost:3000/add", carInfo)
          .then(res => console.log(res.data));

       // window.location = '/RenderedCars'
      }


    render() {
        return (

        <div>
             <p>Add Car Form</p>

             <div>

            <label> Select Brand </label>

            <select
            required
            value={this.state.brand}
            onChange={this.onChangeBrand}
            // inputProps={{
            //   name: "Select brand",
            //   id: "filled-age-native-simple",
            // }}
            >

            <option value="all">Select All</option>
            <option value="BMW">BMW</option>
            <option value="Ford">Ford</option>
            <option value="Chevrolet">Chevrolet</option>
            <option value="Dodge">Dodge</option>
            </select>
          </div>


            <div>
            <label>Select Year</label>
            <select
            required
            value={this.state.year}
            onChange={this.onChangeYear}
            // style={{ margin: "50px 10px 10px 0px" }}
            // native
            // value={this.state.value}
            // onChange={this.onChangeYearHandler.bind(this)}
            // inputProps={{
            //   name: "Select year",
            //   id: "filled-age-native-simple",
            // }}
            >

            <option value="2007">2007</option>
            <option value="2008">2008</option>
            <option value="2010">2010</option>
            <option value="2011">2011</option>
            <option value="2012">2012</option>
            <option value="2013">2013</option>
            <option value="2014">2014</option>
            <option value="2017">2017</option>
            <option value="2020">2020</option>
          </select>
            </div>

            <div>
            <label>Select Colour</label>
            <select
            required
            value={this.state.colour}
            onChange={this.onChangeColour}
            // style={{ margin: "50px 10px 10px 0px" }}
            // native
            // value={this.state.value}
            // onChange={this.onChangeColourHandler.bind(this)}
            // inputProps={{
            //   name: "Select colour",
            //   id: "filled-age-native-simple",
            // }}
            >

            <option value="black">Black</option>
            <option value="gray">Gray</option>
            <option value="white">White</option>
            <option value="blue">Blue</option>
            <option value="orange">Orange</option>
          </select>
            </div>

            {/* <div>
            <label>Select Price Range</label>
            <select
            style={{ margin: "50px 10px 10px 0px" }}
            native
            value={this.state.value}
            onChange={this.onChangePriceHandler.bind(this)}
            inputProps={{
              name: "Select price",
              id: "filled-age-native-simple",
            }}
            >
            <option aria-label="None" value="" />
            <option value="highestToLowest">Highest to lowest</option>
            <option value="lowestToHighest">Lowest to highest</option>
          </select>
            </div> */}

            <div>
                <label>Upload Image</label>
            </div>

            <div>
                <button type="submit" value = "Submit" onClick = {this.onSubmit}>Submit</button>
            </div>
        </div>

        )
    }
};