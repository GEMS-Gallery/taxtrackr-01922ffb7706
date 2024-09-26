import Array "mo:base/Array";
import Func "mo:base/Func";
import Hash "mo:base/Hash";

import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Option "mo:base/Option";

actor TaxPayerManager {
    // Define the TaxPayer type
    public type TaxPayer = {
        tid: Text;
        firstName: Text;
        lastName: Text;
        address: Text;
    };

    // Create a stable variable to store TaxPayers
    private stable var taxPayersEntries : [(Text, TaxPayer)] = [];
    private var taxPayers = HashMap.HashMap<Text, TaxPayer>(0, Text.equal, Text.hash);

    // Initialize the taxPayers HashMap from stable storage
    system func preupgrade() {
        taxPayersEntries := Iter.toArray(taxPayers.entries());
    };

    system func postupgrade() {
        taxPayers := HashMap.fromIter<Text, TaxPayer>(taxPayersEntries.vals(), 0, Text.equal, Text.hash);
    };

    // Function to add a new TaxPayer
    public func addTaxPayer(tp: TaxPayer) : async () {
        taxPayers.put(tp.tid, tp);
    };

    // Function to get all TaxPayers
    public query func getAllTaxPayers() : async [TaxPayer] {
        Iter.toArray(taxPayers.vals())
    };

    // Function to search for a TaxPayer by TID
    public query func searchTaxPayer(tid: Text) : async ?TaxPayer {
        taxPayers.get(tid)
    };
}
