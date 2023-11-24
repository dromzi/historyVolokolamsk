using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace scooter_rental {
    internal class ScooterTimer {
        public int id;
        public DateTime time;

        public ScooterTimer(int id, DateTime time) {
            this.id = id;
            this.time = time;
        }
    }
}
