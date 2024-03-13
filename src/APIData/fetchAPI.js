const fetchCartData = async () => {
    try {
      const userRegister = localStorage.getItem("authToken");
      const response = await fetch(
        `https://academics.newtonschool.co/api/v1/ecommerce/cart`,
        {
          method: "GET",
          headers: {
            projectID: "rhxg8aczyt09",
            Authorization: `Bearer ${userRegister}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        console.log("CartPatch Data ==");
        return;
      }

      // const updatedCartData = await response.json();
      const { data } = await response.json();
      const cartData = data.items;
      console.log("CartPatch Data ==", cartData);

      setCartList(cartData);
      calculateTotalPrice(cartData);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };