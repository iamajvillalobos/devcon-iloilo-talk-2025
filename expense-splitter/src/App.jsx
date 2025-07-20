import { useState } from 'react'
import './App.css'

function App() {
  const [people, setPeople] = useState([])
  const [orders, setOrders] = useState([])
  const [personName, setPersonName] = useState('')
  const [orderItem, setOrderItem] = useState('')
  const [orderPrice, setOrderPrice] = useState('')
  const [orderPerson, setOrderPerson] = useState('')

  const addPerson = () => {
    if (personName.trim()) {
      setPeople([...people, { id: Date.now(), name: personName.trim() }])
      setPersonName('')
    }
  }

  const addOrder = () => {
    if (orderItem.trim() && orderPrice && orderPerson) {
      setOrders([...orders, {
        id: Date.now(),
        item: orderItem.trim(),
        price: parseFloat(orderPrice),
        orderedBy: Number(orderPerson),
        sharedWith: [Number(orderPerson)]
      }])
      setOrderItem('')
      setOrderPrice('')
      setOrderPerson('')
    }
  }

  const toggleSharing = (orderId, personId) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        const numPersonId = Number(personId)
        const isSharing = order.sharedWith.includes(numPersonId)
        return {
          ...order,
          sharedWith: isSharing
            ? order.sharedWith.filter(p => p !== numPersonId)
            : [...order.sharedWith, numPersonId]
        }
      }
      return order
    }))
  }

  const calculateSplits = () => {
    const splits = {}
    
    people.forEach(person => {
      splits[person.id] = 0
    })

    orders.forEach(order => {
      const splitAmount = order.price / order.sharedWith.length
      order.sharedWith.forEach(personId => {
        splits[personId] += splitAmount
      })
    })

    return splits
  }

  const splits = calculateSplits()

  return (
    <div className="app">
      <h1>Expense Splitter</h1>
      
      <div className="top-section">
        <div className="section">
          <h2>Add People</h2>
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter name"
              value={personName}
              onChange={(e) => setPersonName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addPerson()}
            />
            <button onClick={addPerson}>Add Person</button>
          </div>
          <div className="people-list">
            {people.map(person => (
              <div key={person.id} className="person-tag">
                {person.name}
              </div>
            ))}
          </div>
        </div>

        <div className="section">
          <h2>Add Orders</h2>
          <div className="input-group">
            <input
              type="text"
              placeholder="Food item"
              value={orderItem}
              onChange={(e) => setOrderItem(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price (₱)"
              value={orderPrice}
              onChange={(e) => setOrderPrice(e.target.value)}
            />
            <select
              value={orderPerson}
              onChange={(e) => setOrderPerson(e.target.value)}
            >
              <option value="">Who ordered?</option>
              {people.map(person => (
                <option key={person.id} value={person.id}>
                  {person.name}
                </option>
              ))}
            </select>
            <button onClick={addOrder}>Add Order</button>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="section orders-section">
          <h2>Orders & Sharing</h2>
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-info">
                  <strong>{order.item}</strong> - ₱{order.price.toFixed(2)}
                  <br />
                  <small>Ordered by: {people.find(p => p.id === order.orderedBy)?.name}</small>
                </div>
                <div className="sharing-options">
                  <strong>Shared with:</strong>
                  {people.map(person => (
                    <label key={person.id} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={order.sharedWith.includes(person.id)}
                        onChange={() => toggleSharing(order.id, person.id)}
                      />
                      {person.name}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section summary-section">
          <h2>Split Summary</h2>
          <div className="summary">
            {people.map(person => (
              <div key={person.id} className="summary-item">
                <strong>{person.name}:</strong> ₱{splits[person.id].toFixed(2)}
              </div>
            ))}
            <div className="summary-total">
              <strong>Total:</strong> ₱{orders.reduce((sum, order) => sum + order.price, 0).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
