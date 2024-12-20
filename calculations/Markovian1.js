class Markovian1 {
  /**
   * Constructor:
   * Initializes the Markovian1 model with the given parameters.
   * @param {number} arrivalRate - Lambda (arrival rate).
   * @param {number} serviceRate - Mu (service rate).
   */
  constructor(arrivalRate, serviceRate) {
    this.arrivalRate = arrivalRate; // λ
    this.serviceRate = serviceRate; // μ
  }

  /**
   * Calculates the average number of customers in the system (L).
   * @returns {number} Average number of customers in the system.
   */
  averageCustomers() {
    if (this.serviceRate <= this.arrivalRate) {
      throw new Error(
        "Service rate must be greater than arrival rate to avoid system instability."
      );
    }
    return this.arrivalRate / (this.serviceRate - this.arrivalRate);
  }

  /**
   * Calculates the average number of customers in the queue (Lq).
   * @returns {number} Average number of customers in the queue.
   */
  averageCustomersQueue() {
    const rho = this.arrivalRate / this.serviceRate; // Utilization
    return rho * this.averageCustomers();
  }

  /**
   * Calculates the average time a customer spends in the system (W).
   * @returns {number} Average time in the system.
   */
  averageWait() {
    return this.averageCustomers() / this.arrivalRate;
  }

  /**
   * Calculates the average time a customer spends in the queue (Wq).
   * @returns {number} Average time in the queue.
   */
  averageWaitQueue() {
    return this.averageCustomersQueue() / this.arrivalRate;
  }
}
export default Markovian1;
