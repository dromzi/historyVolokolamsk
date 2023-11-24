using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using static System.Console;

namespace scooter_rental
{
    public partial class Main : Form
    {
        public Main(string name, string lastname, float balance, string role)
        {
            InitializeComponent();

            nameMain.Text = name;
            lastnameMain.Text = lastname;
            balanceMain.Text = Convert.ToString(balance);

            string json = File.ReadAllText("scooters.json");
            List<Scooter> scooters = JsonConvert.DeserializeObject<List<Scooter>>(json);

            for ( int i = 1; i < scooters.Count + 1; i++ ) {
                Controls[$"blockscooter_{i}"].Controls[$"scooterName{i}"].Text = scooters[i - 1].name;

                PictureBox scooterImg = (PictureBox)Controls[$"blockscooter_{i}"].Controls[$"scooterImg{i}"];
                scooterImg.Image = Image.FromFile(Path.GetFullPath(scooters[i - 1].avatar));
            }

            showRentPanel();

            if(role == "admin") {
                adminPanel();
            }
        }

        private void adminPanel() {
            //System.Diagnostics.Process.Start(Application.StartupPath + @"\gr.exe");
            Console.WriteLine("Вы админ");
        }

        private void showPrice(object sender, EventArgs e) {
            RadioButton radio = (RadioButton)sender;
            int id = Convert.ToInt16(radio.Name.Split('_')[1]);
            int hour = Convert.ToInt16(radio.Name.Split('_')[2]);

            string json = File.ReadAllText("scooters.json");
            List<Scooter> scooters = JsonConvert.DeserializeObject<List<Scooter>>(json);

            float price = scooters[id - 1].price * hour;
            Controls[$"blockscooter_{id}"].Controls[$"rentprice_{id}"].Text = price.ToString();
        }

        private void rentButtonClick(object sender, EventArgs e) {
            Button button = (Button)sender;
            int id = Convert.ToInt16(button.Name.Split('_')[1]);

            string json1 = File.ReadAllText("currentUser.json");
            User currentUser = JsonConvert.DeserializeObject<User>(json1);

            string price = Controls[$"blockscooter_{id}"].Controls[$"rentprice_{id}"].Text;
            if (!String.IsNullOrEmpty(price)) {
                if(Convert.ToInt16(price) > currentUser.balance) {
                    MessageBox.Show("Недостаточно средств");
                    return;
                }

                currentUser.balance -= Convert.ToInt16(price);
                balanceMain.Text = currentUser.balance.ToString();

                string json2 = JsonConvert.SerializeObject(currentUser);
                File.WriteAllText("currentUser.json", json2);

                string json3 = File.ReadAllText("users.json");
                List<User> users = JsonConvert.DeserializeObject<List<User>>(json3);

                for (int i = 0; i < users.Count; i++) {
                    if (users[i].login == currentUser.login) users[i].balance = currentUser.balance;
                }

                string json4 = JsonConvert.SerializeObject(users);
                File.WriteAllText("users.json", json4);

                for (int i = 1; i < 5; i++) {
                    RadioButton radio = (RadioButton)Controls[$"blockscooter_{id}"].Controls[$"hour_{id}_{i}"];
                    if (radio.Checked) {
                        DateTime rentTime = DateTime.Now;
                        rentTime = rentTime.AddHours(i);

                        string json5 = File.ReadAllText("scooters.json");
                        List<Scooter> scooters = JsonConvert.DeserializeObject<List<Scooter>>(json5);

                        scooters[id - 1].rentTime = rentTime;

                        string json6 = JsonConvert.SerializeObject(scooters);
                        File.WriteAllText("scooters.json", json6);

                        showRentPanel();

                        break;
                    }
                }
            } else return;
        }

        List<ScooterTimer> scooterTimers = new List<ScooterTimer>();

        private void showRentPanel() {
            string json = File.ReadAllText("scooters.json");
            List<Scooter> scooters = JsonConvert.DeserializeObject<List<Scooter>>(json);

            for(int i = 0; i < scooters.Count; i++) {
                if (scooters[i].rentTime > DateTime.Now) {
                    Controls[$"rentPanel_{i + 1}"].Visible = true;

                    scooterTimers.Add(new ScooterTimer(i + 1, scooters[i].rentTime));
                    timer1.Enabled = true;
                }
            }
        }

        private void timer1_Tick(object sender, EventArgs e) {
            for(int i = 0; i < scooterTimers.Count; i++) {
                Controls[$"rentPanel_{scooterTimers[i].id}"].Controls[$"timer_{scooterTimers[i].id}"].Text = (scooterTimers[i].time - DateTime.Now).ToString().Split('.')[0];
            }
        }

        private void Main_FormClosed(object sender, FormClosedEventArgs e) {
            Application.Exit();
        }

        private void exitButton_Click(object sender, EventArgs e) {
            File.WriteAllText("currentUser.json", "{}");

            new Authrorize().Show();
            this.Hide();
        }
    }
}
