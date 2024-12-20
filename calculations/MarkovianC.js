class Markovian1C {
  constructor(arrivalRate, serviceRate, numOfServers) {
    this.arrivalRate = arrivalRate; // λ
    this.serviceRate = serviceRate; // μ
    this.numOfServers = numOfServers; // C
    this.r = arrivalRate / serviceRate; // ρ * C
    this.row = this.r / numOfServers; // ρ (utilization per server)
    this.p0 = this.calculateP0(); // P(0)
    this.Lq = this.averageCustomersQueue(); // Lq (queue size)
  }

  // Method to calculate P0 (probability that the system is empty)
  calculateP0() {
    let summation = 0;

    if (this.row < 1) {
      for (let n = 0; n < this.numOfServers; n++) {
        summation += Math.pow(this.r, n) / this.factorial(n);
      }
      const term =
        (this.numOfServers * Math.pow(this.r, this.numOfServers)) /
        (this.factorial(this.numOfServers) * (this.numOfServers - this.r));
      return 1 / (summation + term);
    } else {
      for (let n = 0; n < this.numOfServers; n++) {
        summation += (1 / this.factorial(n)) * Math.pow(this.r, n);
      }
      const term =
        (1 / this.factorial(this.numOfServers)) *
        Math.pow(this.r, this.numOfServers) *
        ((this.numOfServers * this.serviceRate) /
          (this.numOfServers * this.serviceRate - this.arrivalRate));
      return 1 / (summation + term);
    }
  }

  // Method to calculate the average number of customers in the queue (Lq)
  averageCustomersQueue() {
    const numerator =
      Math.pow(this.r, this.numOfServers + 1) / this.numOfServers;
    const denominator =
      this.factorial(this.numOfServers) * Math.pow(1 - this.row, 2);
    return (numerator * this.p0) / denominator;
  }

  // Method to calculate the average wait time in the queue (Wq)
  averageWaitQueue() {
    return this.Lq / this.arrivalRate;
  }

  // Method to calculate the average number of customers in the system (L)
  averageCustomers() {
    return this.Lq + this.r;
  }

  // Method to calculate the average wait time in the system (W)
  averageWait() {
    return this.Lq / this.arrivalRate + 1 / this.serviceRate;
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

export default Markovian1C;
