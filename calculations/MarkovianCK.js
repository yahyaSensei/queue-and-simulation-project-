class MarkovianCK {
  /**
   * Constructor:
   * Initializes the MarkovianCK model with the given parameters.
   * @param {number} arrivalRate - Lambda (arrival rate).
   * @param {number} serviceRate - Mu (service rate).
   * @param {number} numOfServers - Number of servers (C).
   * @param {number} systemCapacity - System capacity (K).
   */
  constructor(arrivalRate, serviceRate, numOfServers, systemCapacity) {
    this.arrivalRate = arrivalRate; // λ
    this.serviceRate = serviceRate; // μ
    this.numOfServers = numOfServers; // C
    this.systemCapacity = systemCapacity; // K

    this.r = arrivalRate / serviceRate; // ρ * C
    this.row = this.r / numOfServers; // ρ (utilization per server)

    this.p0 = this.calculateP0(); // P(0)
    this.pk = this.calculatePk(); // P(K)
    this.Lq = this.averageCustomersQueue(); // Lq (queue size)
    this.lampdaDash = this.arrivalRate * (1 - this.pk); // Effective arrival rate
  }

  // Method to calculate P0 (probability that the system is empty)
  calculateP0() {
    let summation = 0;

    for (let n = 0; n < this.numOfServers; n++) {
      summation += Math.pow(this.r, n) / this.factorial(n);
    }

    const left =
      Math.pow(this.r, this.numOfServers) / this.factorial(this.numOfServers);

    let right;
    if (this.row === 1) {
      right = this.systemCapacity - this.numOfServers + 1;
    } else {
      const numerator =
        1 - Math.pow(this.row, this.systemCapacity - this.numOfServers + 1);
      const denominator = 1 - this.row;
      right = numerator / denominator;
    }

    const finalOutput = summation + left * right;

    return 1 / finalOutput;
  }

  // Method to calculate P(K) (probability that the system is full)
  calculatePk() {
    if (this.row === 1) {
      return 1 / (this.systemCapacity + 1);
    } else {
      const numerator =
        (1 - this.row) * Math.pow(this.row, this.systemCapacity);
      const denominator = 1 - Math.pow(this.row, this.systemCapacity + 1);
      return numerator / denominator;
    }
  }

  // Method to calculate the average number of customers in the queue (Lq)
  averageCustomersQueue() {
    const leftNumerator =
      Math.pow(this.r, this.numOfServers) * this.p0 * this.row;
    const leftDenominator =
      this.factorial(this.numOfServers) * Math.pow(1 - this.row, 2);
    const left = leftNumerator / leftDenominator;

    const term1 = Math.pow(
      this.row,
      this.systemCapacity - this.numOfServers + 1
    );
    const term2 =
      (1 - this.row) *
      (this.systemCapacity - this.numOfServers + 1) *
      Math.pow(this.row, this.systemCapacity - this.numOfServers);
    const right = 1 - term1 - term2;

    return left * right;
  }

  // Method to calculate the average number of customers in the system (L)
  averageCustomers() {
    let summation = 0;

    for (let n = 0; n < this.numOfServers; n++) {
      summation +=
        (this.numOfServers - n) * (Math.pow(this.r, n) / this.factorial(n));
    }

    return this.Lq + this.numOfServers - this.p0 * summation;
  }

  // Method to calculate the average wait time in the queue (Wq)
  averageWaitQueue() {
    return this.Lq / this.lampdaDash;
  }

  // Method to calculate the average wait time in the system (W)
  averageWait() {
    return this.averageCustomers() / this.lampdaDash;
  }

  // Utility method to calculate factorial
  factorial(n) {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }
}
export default MarkovianCK;
