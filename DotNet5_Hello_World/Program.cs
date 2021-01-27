using System;

namespace DotNet5_Hello_World
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            Console.WriteLine($"The current time is {DateTime.Now.TimeOfDay} on {DateTime.Now.Date}");
        }
    }
}
