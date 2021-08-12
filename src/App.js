import './App.css';
import {useState, useEffect} from 'react'
import axios from 'axios'
import Auth from './components/Auth'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const App = () => {
    const [newImage, setNewImage] = useState('')
    const [newLocation, setNewLocation] = useState('')
    const [newLanguage, setNewLanguage] = useState('')
    const [newPopulation, setNewPopulation] = useState(0)
    const [newDestinations, setNewDestinations] = useState([])
    useEffect(() => {
        axios
            .get("https://limitless-sands-92837.herokuapp.com/destinations")
            .then((response) => {
                setNewDestinations(response.data)
            })
    })
    // this is the handler to set the new image
    const handleNewImage = (event) => {
        // grabs the value in the input tag
        setNewImage(event.target.value)
    }
    // handler to set the new location
    const handleNewLocation = (event) => {
        setNewLocation(event.target.value)
    }
    // handler to set new language
    const handleNewLanguage = (event) => {
        setNewLanguage(event.target.value)
    }
    // handler to set new population
    const handleNewPopulation = (event) => {
        setNewPopulation(event.target.value)
    }
    // this is the handler to submit the new destination form
    const handleNewDestinationsSubmit = (event) => {
        event.preventDefault()
        axios.post(
            "https://limitless-sands-92837.herokuapp.com/destinations",
            {
                image: newImage,
                location: newLocation,
                language: newLanguage,
                population: newPopulation
            }
        )
        .then(() => {
            axios
                .get("https://limitless-sands-92837.herokuapp.com/destinations")
                .then((response) => {
                    setNewDestinations(response.data)
                })
        })
        // this will reset the form inputs and will be blank after clicking create button
        event.currentTarget.reset()
    }
    // this is the handler for the delete button
    const handleDelete = (destinationData) => {
        axios
            .delete(`https://limitless-sands-92837.herokuapp.com/destinations/${destinationData._id}`)
            .then(() => {
                axios
                    .get("https://limitless-sands-92837.herokuapp.com/destinations")
                    .then((response) => {
                        setNewDestinations(response.data)
                    })
            })
    }
    // this is the handler for edit form
    const handleEdit = (event, destinationData) => {
        event.preventDefault()
        axios
            .put(`https://limitless-sands-92837.herokuapp.com/destinations/${destinationData._id}`,
                {
                    location: newLocation || destinationData.location,
                    image: newImage || destinationData.image,
                    language: newLanguage || destinationData.language,
                    population: newPopulation || destinationData.population
                }
            )
            .then(() => {
                axios
                    .get("https://limitless-sands-92837.herokuapp.com/destinations")
                    .then((response) => {
                        setNewDestinations(response.data)
                    })
            })
        event.currentTarget.reset()
    }

const styles = {
    card: {
        backgroundColor: "#9C9C9C",
        color: "#000000"
    },
    cardImage: {
        objectFit: "cover"
    },
    delete: {
        backgroundColor: "#FF6200",
        color: "#404040"
    }
}
// rendering to the browser
//////////////////////////////
    return (
        <main>
            <Auth />
            <Container>
                <section class="create-destination-form">
                <h3>Create a New Destination</h3>
                    <details>
                    <summary>New Destination</summary>
                        <form onSubmit={ handleNewDestinationsSubmit }>
                            Location: <input type="text" onChange={ handleNewLocation } /><br/>
                            Image: <input type="text" onChange={ handleNewImage } /><br/>
                            Language: <input type="text" onChange={ handleNewLanguage } /><br/>
                            Population: <input type="text" onChange={ handleNewPopulation } /><br/>
                            <input class="btn btn-outline-secondary" type="submit" value="Create New Destination" />
                        </form>
                    </details>
                </section><br />

                <section>
                    <h1>Destinations</h1>
                    <>
                        {
                            newDestinations.map((destination) => {
                                return <>

                                    <Card className="card" style={styles.card}>
                                        <Card.Img varient="top" className="card-img" />
                                            <Carousel>
                                                <Carousel.Item>
                                                    <img src={destination.image} style={styles.cardImage}/>
                                                </Carousel.Item>
                                                <Carousel.Item>
                                                    <img src={destination.image} />
                                                </Carousel.Item>
                                                <Carousel.Item>
                                                    <img src={destination.image} />
                                                </Carousel.Item>
                                            </Carousel>

                                        <Card.Body>
                                            <Card.Title>{destination.location}</Card.Title>
                                            <Card.Text>
                                                Language Spoken: {destination.language}<br/>
                                                Population: {destination.population}
                                            </Card.Text>
                                        </Card.Body>

                                        <details>
                                            <summary>Edit Destination</summary>
                                                <form onSubmit={ (event) => { handleEdit (event, destination)} } >
                                                    Location: <input type="text" onChange={ handleNewLocation } /> <br/>
                                                    Image: <input type="text" onChange={ handleNewImage } /> <br/>
                                                    Language: <input type="text" onChange={ handleNewLanguage } /> <br/>
                                                    Population: <input type="text" onChange={ handleNewPopulation } /> <br/>
                                                    <input class="btn btn-info" type="submit" value="Update Destination" />
                                                </form>
                                        </details>
                                        <Button class="btn" style={styles.delete} onClick={ (event) => {handleDelete(destination) } }>Delete</Button>
                                    </Card><br />
                                </>
                            })
                        }
                    </>
                </section>
            </Container>
        </main>
    )
}
export default App;
