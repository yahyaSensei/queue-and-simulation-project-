class Markovian1k {
  constructor(arrivalRate, serviceRate, systemCapacity) {
    this.arrivalRate = arrivalRate;
    this.serviceRate = serviceRate;
    this.systemCapacity = systemCapacity;
    this.row = arrivalRate / serviceRate;

    // Calculate p_k
    if (this.row === 1) {
      this.pK = 1 / (systemCapacity + 1);
    } else {
      const numerator = (1 - this.row) * Math.pow(this.row, systemCapacity);
      const denominator = 1 - Math.pow(this.row, systemCapacity + 1);
      this.pK = numerator / denominator;
    }

    // Calculate lambda_dash (adjusted arrival rate)
    this.lambdaDash = arrivalRate * (1 - this.pK);
  }

  // Method to calculate the average number of customers in the system (L)
  averageCustomers() {
    const K = this.systemCapacity;

    if (this.row === 1) {
      return K / 2;
    } else {
      const numerator =
        this.row *
        (1 - (K + 1) * Math.pow(this.row, K) + K * Math.pow(this.row, K + 1));
      const denominator = (1 - this.row) * (1 - Math.pow(this.row, K + 1));
      return numerator / denominator;
    }
  }

  // Method to calculate the average wait time in the system (W)
  averageWait() {
    return this.averageCustomers() / this.lambdaDash;
  }

  // Method to calculate the average number of customers in the queue (Lq)
  averageCustomersQueue() {
    return this.averageCustomers() - this.row * (1 - this.pK);
  }

  // Method to calculate the average wait time in the queue (Wq)
  averageWaitQueue() {
    return this.averageCustomersQueue() / this.lambdaDash;
  }
}