
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			token: sessionStorage.getItem("token") || null,
			email: sessionStorage.getItem("email") || null
		},
		actions: {
			// Use getActions to call a function within a fuction

			getMessage: async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/message`);
                    const data = await response.json();
                    setStore({ message: data.message });
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },
			signUp: async (email, password, is_active) => {
				const store = getStore();
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/registro`, {
						method: 'POST',
						body: JSON.stringify({ email, password, is_active }), // Enviar los datos como JSON
						headers: { "Content-Type": "application/json" } // Asegúrate de enviar este encabezado
					});
			
					if (!response.ok) {
						const errorData = await response.json();
						console.log("Error en el registro", errorData);
						return false; // Retornar false si hay error
					}
			
					const data = await response.json();
			
					if (data.access_token) {
						sessionStorage.setItem("token", data.access_token);
						sessionStorage.setItem("email", data.email);
						setStore({ ...store, token: data.access_token, email: data.email });
						return true; // Registro exitoso
					} else {
						console.log("Token no recibido", data);
						return false;
					}
				} catch (error) {
					console.log("Error en el registro", error);
					return false; // Error en la solicitud
				}
			},
			
			logIn: async (email, password) => {
				const store = getStore();
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
						method: 'POST',
						body: JSON.stringify({ email, password }),
						headers: { "Content-Type": "application/json" }
					})
					const data = await response.json();
			
					if (data.token) {
						sessionStorage.setItem("token", data.token);
						sessionStorage.setItem("email", data.email);
						setStore({ ...store, token: data.token, email: data.email });
						return true; // Login exitoso
					} else {
						console.log("Token not received", data);
						return false; // Error en el login
					}
				} catch (error) {
					console.log("Error loading message from backend", error);
					return false; // Error en la solicitud
				}
			},
			logOut: () => {
				const store = getStore();
				sessionStorage.removeItem("token");
				setStore({ ...store, token: '', email: '' });
			}

		}
	};
};

export default getState;
