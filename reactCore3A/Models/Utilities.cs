using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using System.Runtime.Serialization.Formatters.Binary;
using System.Runtime.Serialization;


namespace reactCore3A.Models
{
    class Utilities
    {
        public static byte[] SerializeToMemory(object o)
        {
            MemoryStream stream = new MemoryStream();
            IFormatter formatter = new BinaryFormatter();
            formatter.Serialize(stream, o);
            byte[] blob = stream.ToArray();
            return blob;
        }

        public static T DeserializeFromMemory<T>(byte[] blob)
        {
            MemoryStream stream = new MemoryStream(blob);
            IFormatter formatter = new BinaryFormatter();
            stream.Seek(0, SeekOrigin.Begin);
            T obj = (T)formatter.Deserialize(stream);
            return obj;
        }

    }
}
