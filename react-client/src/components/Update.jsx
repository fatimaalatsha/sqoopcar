import React, { Component } from 'react';
import axios from "axios";

export default class Update extends Component {
  constructor(props) {
    super(props);

    this.onChangeBrand = this.onChangeBrand.bind(this);
    this.onChangeYear = this.onChangeYear.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangecolour = this.onChangecolour.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);



    this.state = {
      brand : "",
      year : "",
      price : "",
      colour : "",
      description : "",
      image : ""
    }
}

componentDidMount() {
  // you need to fix the path ..
  axios.get('http://localhost:3000/.../'+this.props.match.params.id)


    .then(response => {
      this.setState({
        brand: response.data.brand,
        year: response.data.year,
        price: response.data.price,
        colour: response.data.colour,
        description: response.data.description,
        image: response.data.image
      })

    })
    .catch(function (error) {
      console.log(error);
    })
  }

    onChangeBrand(event){
      this.setState({
        brand: event.target.value
      });
    }

    onChangeYear(event){
      this.setState({
        brand: event.target.value
      });
    }

    onChangePrice(event){
      this.setState({
        brand: event.target.value
      });
    }

    onChangecolour(event){
      this.setState({
        brand: event.target.value
      });
    }

    onChangeDescription(event){
      this.setState({
        brand: event.target.value
      });
    }

    onChangeImage(event){
      this.setState({
        brand: event.target.value
      });
    }

    onSubmit(event) {
      event.preventDefault();
      const carForm = {
        brand: this.state.brand,
        year: this.state.year,
        price: this.state.price,
        colour:this.state.colour,
        description:this.state.description,
        image:this.state.image,
      }

      console.log(item);

      //you should fix this also ..
      axios.post("http://localhost:3000/..../update/"+this.props.match.params.id, item)
        .then(res => console.log(res.data));

      window.location = '/ItemsList'
    }


  render (){
    return(
      <div>

      <div>
        hello from Update
     </div>

          <div>
          <label> Brand </label>
          <input
          type = "text"
          value = {this.state.brand}
          onChange = {this.onChangeBrand}
          />
        </div>


        <div>
          <label> Year </label>
          <input
          type = "text"
          value = {this.state.year}
          onChange = {this.onChangeYear}
          />
        </div>


        <div>
          <label> Price </label>
          <input
          type = "text"
          value = {this.state.price}
          onChange = {this.onChangePrice}
          />
        </div>


        <div>
          <label> colour </label>
          <input
          type = "text"
          value = {this.state.colour}
          onChange = {this.onChangecolour}
          />
        </div>


        <div>
          <label> Description </label>
          <input
          type = "text"
          value = {this.state.description}
          onChange = {this.onChangeDescription}
          />
        </div>


        <div>
          <label> Image </label>
          <input
          type = "text"
          value = {this.state.image}
          onChange = {this.onChangeImage}
          />
        </div>

      </div>
    )
  }