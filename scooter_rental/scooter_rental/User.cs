using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace scooter_rental {
    internal class User {
        public string name;
        public string lastname;
        public string login;
        public string password;
        public string phone;
        public float balance;
        public string role;

        public User(string name, string lastname, string login, string password, string phone, string role) {
            this.name = name;
            this.lastname = lastname;
            this.login = login;
            this.password = password;
            this.phone = phone;
            this.balance = 2000;
            this.role = role;
        }
    }
}
