using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace scooter_rental {
    internal class Scooter {
        public int id;
        public string name;
        public float price;
        public string avatar;
        public DateTime rentTime;

        public Scooter(string name, float price, string avatar) {
            this.name = name;
            this.price = price;
            this.avatar = avatar;
        }
    }
}
