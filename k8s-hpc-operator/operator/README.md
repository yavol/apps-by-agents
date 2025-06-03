# operator

Go-based Kubernetes operator for managing HPC jobs via a custom `HPCJob` CRD.

## Getting Started

1. Install Kubebuilder or Operator SDK.
2. Initialize the project and generate APIs:

   ```bash
   kubebuilder init --domain example.com --repo github.com/DolevAlgam/apps-by-agents/k8s-hpc-operator/operator
   kubebuilder create api --group batch --version v1alpha1 --kind HPCJob
   ```

3. Build and run the operator:

   ```bash
   make install run
   ```