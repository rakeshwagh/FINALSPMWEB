import { useState } from 'react';

const addProduct = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const endpoint = 'http://localhost:4000/graphql';
    const graphQLClient = new GraphQLClient(endpoint);

    const mutation = gql`
      mutation AddProduct($name: String!, $image: String!, $description: String!, $price: Float!) {
        addProduct(name: $name, image: $image, description: $description, price: $price) {
          id
          name
          image
          description
          price
        }
      }
    `;

    try {
      const variables = {
        name,
        image,
        description,
        price: parseFloat(price),
      };

      const data = await graphQLClient.request(mutation, variables);
      console.log('Product added:', data.addProduct);

      setName('');
      setImage('');
      setDescription('');
      setPrice('');

      alert('Product added successfully!');
    } catch (error) {
      console.error('There was an error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} required />
      </div>
      <div>
        <label htmlFor="image">Image URL:</label>
        <input type="text" id="image" value={image} onChange={(event) => setImage(event.target.value)} required />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" value={description} onChange={(event) => setDescription(event.target.value)} required />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input type="number" id="price" value={price} onChange={(event) => setPrice(event.target.value)} required />
      </div>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default addProduct;