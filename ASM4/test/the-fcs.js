const TheFunixCryptoSim = artifacts.require("TheFunixCryptoSim");

contract("TheFunixCryptoSim", function(accounts) {
    let instance;

    before(async function() {
        instance = await TheFunixCryptoSim.deployed();
    });

    describe("Contract", function() {
        it("should deployed", function() {
            return assert.isTrue(instance !== undefined);
        });
    });

    // *** Start Code here ***
    describe("Info token", function() {
        it("Check token's symbol", function() {
            return instance.symbol({ from: accounts[0] }).then(function(symbol) {
                assert.equal(symbol, "FCS", "Not correct symbol");
            });
        });

        it("Check token's name", function() {
            return instance.name({ from: accounts[0] }).then(function(name) {
                assert.equal(name, "TheFunixCryptoSims", "Not correct name");
            });
        });
    });

    describe("Info Genesis", function() {
        it("Check first genesis's attributes", function() {
            return instance.getSimDetails(0, { from: accounts[0] }).then(function(result) {
                assert.equal(result[1].body, 0, "Not correct body");
                assert.equal(result[1].eye, 0, "Not correct eye");
                assert.equal(result[1].hairstyle, 0, "Not correct hairstyle");
                assert.equal(result[1].outfit, 0, "Not correct outfit");
                assert.equal(result[1].accessory, 0, "Not correct accessory");
                assert.equal(result[1].hiddenGenes, 0, "Not correct hiddenGenes");
                assert.equal(result[1].generation, 0, "Not correct generation");
            });
        });

        it("Check second genesis's attributes", function() {
            return instance.getSimDetails(1, { from: accounts[0] }).then(function(result) {
                assert.equal(result[1].body, 3, "Not correct body");
                assert.equal(result[1].eye, 7, "Not correct eye");
                assert.equal(result[1].hairstyle, 127, "Not correct hairstyle");
                assert.equal(result[1].outfit, 31, "Not correct outfit");
                assert.equal(result[1].accessory, 31, "Not correct accessory");
                assert.equal(result[1].hiddenGenes, 0, "Not correct hiddenGenes");
                assert.equal(result[1].generation, 0, "Not correct generation");
            });
        });
    });

    describe("Hybrid algorithm", function() {

        describe("Check HiddenGenes X", function() {

            it("Check HiddenGenes X with matronX(0) and sireX(0)", function() {
                return instance.breedSim(0, 1, { from: accounts[0] }).then(function() {
                    return instance.getSimDetails(4, { from: accounts[0] }).then(function(result) {
                        assert.equal(result[1].hiddenGenes, 3, "Not correct hiddenGenes");

                        assert.equal(result[1].hiddenGenes >= 0, true, "Not correct range of hiddenGenes");
                        assert.equal(result[1].hiddenGenes < 4, true, "Not correct range of hiddenGenes");
                    });
                });
            });

            it("Check HiddenGenes X with matronX(1) and sireX(3)", function() {
                return instance.breedSim(2, 4, { from: accounts[0] }).then(function() {
                    return instance.getSimDetails(5, { from: accounts[0] }).then(function(result) {
                        assert.equal(result[1].hiddenGenes, 3, "Not correct hiddenGenes");

                        assert.equal(result[1].hiddenGenes >= 0, true, "Not correct range of hiddenGenes");
                        assert.equal(result[1].hiddenGenes < 4, true, "Not correct range of hiddenGenes");
                    });
                });
            });

            it("Check HiddenGenes X with matronX(2) and sireX(1)", function() {
                return instance.breedSim(3, 2, { from: accounts[0] }).then(function() {
                    return instance.getSimDetails(6, { from: accounts[0] }).then(function(result) {
                        assert.equal(result[1].hiddenGenes, 2, "Not correct hiddenGenes");

                        assert.equal(result[1].hiddenGenes >= 0, true, "Not correct range of hiddenGenes");
                        assert.equal(result[1].hiddenGenes < 4, true, "Not correct range of hiddenGenes");
                    });
                });
            });
        });

        describe("Check all atrributes", function() {
            it("Check all atrributes with HiddenGenesX(3) and matronGeneration >= sireGeneration", function() {
                return instance.breedSim(0, 1, { from: accounts[0] }).then(function() {
                    return instance.getSimDetails(7, { from: accounts[0] }).then(function(result) {
                        assert.equal(result[1].body, 3, "Not correct body");
                        assert.equal(result[1].eye, 7, "Not correct eye");
                        assert.equal(result[1].hairstyle, 127, "Not correct hairstyle");
                        assert.equal(result[1].outfit, 31, "Not correct outfit");
                        assert.equal(result[1].accessory, 30, "Not correct accessory");
                        assert.equal(result[1].generation, 1, "Not correct generation");
                        assert.equal(result[1].hiddenGenes, 3, "Not correct hiddenGenes");

                        assert.equal(result[1].body >= 0, true, "Not correct range of body");
                        assert.equal(result[1].body < 4, true, "Not correct range of body");
                        assert.equal(result[1].eye >= 0, true, "Not correct range of eye");
                        assert.equal(result[1].eye < 8, true, "Not correct range of eye");
                        assert.equal(result[1].hairstyle >= 0, true, "Not correct range of hairstyle");
                        assert.equal(result[1].hairstyle < 128, true, "Not correct range of hairstyle");
                        assert.equal(result[1].outfit >= 0, true, "Not correct range of outfit");
                        assert.equal(result[1].outfit < 33, true, "Not correct range of outfit");
                        assert.equal(result[1].accessory >= 0, true, "Not correct range of accessory");
                        assert.equal(result[1].accessory < 33, true, "Not correct range of accessory");
                        assert.equal(result[1].hiddenGenes >= 0, true, "Not correct range of hiddenGenes");
                        assert.equal(result[1].hiddenGenes < 4, true, "Not correct range of hiddenGenes");
                    });
                });
            });

            it("Check all atrributes with HiddenGenesX(0) and matronGeneration >= sireGeneration", function() {
                return instance.breedSim(2, 2, { from: accounts[0] }).then(function() {
                    return instance.getSimDetails(8, { from: accounts[0] }).then(function(result) {
                        assert.equal(result[1].body, 0, "Not correct body");
                        assert.equal(result[1].eye, 7, "Not correct eye");
                        assert.equal(result[1].hairstyle, 127, "Not correct hairstyle");
                        assert.equal(result[1].outfit, 31, "Not correct outfit");
                        assert.equal(result[1].accessory, 30, "Not correct accessory");
                        assert.equal(result[1].generation, 1, "Not correct generation");
                        assert.equal(result[1].hiddenGenes, 0, "Not correct hiddenGenes");

                        assert.equal(result[1].body >= 0, true, "Not correct range of body");
                        assert.equal(result[1].body < 4, true, "Not correct range of body");
                        assert.equal(result[1].eye >= 0, true, "Not correct range of eye");
                        assert.equal(result[1].eye < 8, true, "Not correct range of eye");
                        assert.equal(result[1].hairstyle >= 0, true, "Not correct range of hairstyle");
                        assert.equal(result[1].hairstyle < 128, true, "Not correct range of hairstyle");
                        assert.equal(result[1].outfit >= 0, true, "Not correct range of outfit");
                        assert.equal(result[1].outfit < 33, true, "Not correct range of outfit");
                        assert.equal(result[1].accessory >= 0, true, "Not correct range of accessory");
                        assert.equal(result[1].accessory < 33, true, "Not correct range of accessory");
                        assert.equal(result[1].hiddenGenes >= 0, true, "Not correct range of hiddenGenes");
                        assert.equal(result[1].hiddenGenes < 4, true, "Not correct range of hiddenGenes");
                    });
                });
            });

            it("Check all atrributes with HiddenGenesX(2) and matronGeneration >= sireGeneration", function() {
                return instance.breedSim(3, 2, { from: accounts[0] }).then(function() {
                    return instance.getSimDetails(9, { from: accounts[0] }).then(function(result) {
                        assert.equal(result[1].body, 0, "Not correct body");
                        assert.equal(result[1].eye, 6, "Not correct eye");
                        assert.equal(result[1].hairstyle, 0, "Not correct hairstyle");
                        assert.equal(result[1].outfit, 30, "Not correct outfit");
                        assert.equal(result[1].accessory, 29, "Not correct accessory");
                        assert.equal(result[1].generation, 1, "Not correct generation");
                        assert.equal(result[1].hiddenGenes, 2, "Not correct hiddenGenes");

                        assert.equal(result[1].body >= 0, true, "Not correct range of body");
                        assert.equal(result[1].body < 4, true, "Not correct range of body");
                        assert.equal(result[1].eye >= 0, true, "Not correct range of eye");
                        assert.equal(result[1].eye < 8, true, "Not correct range of eye");
                        assert.equal(result[1].hairstyle >= 0, true, "Not correct range of hairstyle");
                        assert.equal(result[1].hairstyle < 128, true, "Not correct range of hairstyle");
                        assert.equal(result[1].outfit >= 0, true, "Not correct range of outfit");
                        assert.equal(result[1].outfit < 33, true, "Not correct range of outfit");
                        assert.equal(result[1].accessory >= 0, true, "Not correct range of accessory");
                        assert.equal(result[1].accessory < 33, true, "Not correct range of accessory");
                        assert.equal(result[1].hiddenGenes >= 0, true, "Not correct range of hiddenGenes");
                        assert.equal(result[1].hiddenGenes < 4, true, "Not correct range of hiddenGenes");
                    });
                });
            });

            it("Check all atrributes with HiddenGenesX(1) and matronGeneration >= sireGeneration", function() {
                return instance.breedSim(2, 1, { from: accounts[0] }).then(function() {
                    return instance.getSimDetails(10, { from: accounts[0] }).then(function(result) {
                        assert.equal(result[1].body, 0, "Not correct body");
                        assert.equal(result[1].eye, 7, "Not correct eye");
                        assert.equal(result[1].hairstyle, 0, "Not correct hairstyle");
                        assert.equal(result[1].outfit, 31, "Not correct outfit");
                        assert.equal(result[1].accessory, 30, "Not correct accessory");
                        assert.equal(result[1].generation, 1, "Not correct generation");
                        assert.equal(result[1].hiddenGenes, 1, "Not correct hiddenGenes");

                        assert.equal(result[1].body >= 0, true, "Not correct range of body");
                        assert.equal(result[1].body < 4, true, "Not correct range of body");
                        assert.equal(result[1].eye >= 0, true, "Not correct range of eye");
                        assert.equal(result[1].eye < 8, true, "Not correct range of eye");
                        assert.equal(result[1].hairstyle >= 0, true, "Not correct range of hairstyle");
                        assert.equal(result[1].hairstyle < 128, true, "Not correct range of hairstyle");
                        assert.equal(result[1].outfit >= 0, true, "Not correct range of outfit");
                        assert.equal(result[1].outfit < 33, true, "Not correct range of outfit");
                        assert.equal(result[1].accessory >= 0, true, "Not correct range of accessory");
                        assert.equal(result[1].accessory < 33, true, "Not correct range of accessory");
                        assert.equal(result[1].hiddenGenes >= 0, true, "Not correct range of hiddenGenes");
                        assert.equal(result[1].hiddenGenes < 4, true, "Not correct range of hiddenGenes");
                    });
                });
            });

            it("Check all atrributes with HiddenGenesX(1) and matronGeneration < sireGeneration", function() {
                return instance.breedSim(0, 10, { from: accounts[0] }).then(function() {
                    return instance.getSimDetails(11, { from: accounts[0] }).then(function(result) {
                        assert.equal(result[1].body, 3, "Not correct body");
                        assert.equal(result[1].eye, 0, "Not correct eye");
                        assert.equal(result[1].hairstyle, 0, "Not correct hairstyle");
                        assert.equal(result[1].outfit, 0, "Not correct outfit");
                        assert.equal(result[1].accessory, 30, "Not correct accessory");
                        assert.equal(result[1].generation, 2, "Not correct generation");
                        assert.equal(result[1].hiddenGenes, 1, "Not correct hiddenGenes");

                        assert.equal(result[1].body >= 0, true, "Not correct range of body");
                        assert.equal(result[1].body < 4, true, "Not correct range of body");
                        assert.equal(result[1].eye >= 0, true, "Not correct range of eye");
                        assert.equal(result[1].eye < 8, true, "Not correct range of eye");
                        assert.equal(result[1].hairstyle >= 0, true, "Not correct range of hairstyle");
                        assert.equal(result[1].hairstyle < 128, true, "Not correct range of hairstyle");
                        assert.equal(result[1].outfit >= 0, true, "Not correct range of outfit");
                        assert.equal(result[1].outfit < 33, true, "Not correct range of outfit");
                        assert.equal(result[1].accessory >= 0, true, "Not correct range of accessory");
                        assert.equal(result[1].accessory < 33, true, "Not correct range of accessory");
                        assert.equal(result[1].hiddenGenes >= 0, true, "Not correct range of hiddenGenes");
                        assert.equal(result[1].hiddenGenes < 4, true, "Not correct range of hiddenGenes");
                    });
                });
            });

            it("Check all atrributes with HiddenGenesX(0) and matronGeneration < sireGeneration", function() {
                return instance.breedSim(10, 11, { from: accounts[0] }).then(function() {
                    return instance.getSimDetails(12, { from: accounts[0] }).then(function(result) {
                        assert.equal(result[1].body, 3, "Not correct body");
                        assert.equal(result[1].eye, 0, "Not correct eye");
                        assert.equal(result[1].hairstyle, 0, "Not correct hairstyle");
                        assert.equal(result[1].outfit, 0, "Not correct outfit");
                        assert.equal(result[1].accessory, 28, "Not correct accessory");
                        assert.equal(result[1].generation, 3, "Not correct generation");
                        assert.equal(result[1].hiddenGenes, 0, "Not correct hiddenGenes");

                        assert.equal(result[1].body >= 0, true, "Not correct range of body");
                        assert.equal(result[1].body < 4, true, "Not correct range of body");
                        assert.equal(result[1].eye >= 0, true, "Not correct range of eye");
                        assert.equal(result[1].eye < 8, true, "Not correct range of eye");
                        assert.equal(result[1].hairstyle >= 0, true, "Not correct range of hairstyle");
                        assert.equal(result[1].hairstyle < 128, true, "Not correct range of hairstyle");
                        assert.equal(result[1].outfit >= 0, true, "Not correct range of outfit");
                        assert.equal(result[1].outfit < 33, true, "Not correct range of outfit");
                        assert.equal(result[1].accessory >= 0, true, "Not correct range of accessory");
                        assert.equal(result[1].accessory < 33, true, "Not correct range of accessory");
                        assert.equal(result[1].hiddenGenes >= 0, true, "Not correct range of hiddenGenes");
                        assert.equal(result[1].hiddenGenes < 4, true, "Not correct range of hiddenGenes");
                    });
                });
            });

            it("Check all atrributes with HiddenGenesX(3) and matronGeneration < sireGeneration", function() {
                return instance.breedSim(1, 12, { from: accounts[0] }).then(function() {
                    return instance.getSimDetails(13, { from: accounts[0] }).then(function(result) {
                        assert.equal(result[1].body, 0, "Not correct body");
                        assert.equal(result[1].eye, 7, "Not correct eye");
                        assert.equal(result[1].hairstyle, 0, "Not correct hairstyle");
                        assert.equal(result[1].outfit, 31, "Not correct outfit");
                        assert.equal(result[1].accessory, 26, "Not correct accessory");
                        assert.equal(result[1].generation, 4, "Not correct generation");
                        assert.equal(result[1].hiddenGenes, 3, "Not correct hiddenGenes");

                        assert.equal(result[1].body >= 0, true, "Not correct range of body");
                        assert.equal(result[1].body < 4, true, "Not correct range of body");
                        assert.equal(result[1].eye >= 0, true, "Not correct range of eye");
                        assert.equal(result[1].eye < 8, true, "Not correct range of eye");
                        assert.equal(result[1].hairstyle >= 0, true, "Not correct range of hairstyle");
                        assert.equal(result[1].hairstyle < 128, true, "Not correct range of hairstyle");
                        assert.equal(result[1].outfit >= 0, true, "Not correct range of outfit");
                        assert.equal(result[1].outfit < 33, true, "Not correct range of outfit");
                        assert.equal(result[1].accessory >= 0, true, "Not correct range of accessory");
                        assert.equal(result[1].accessory < 33, true, "Not correct range of accessory");
                        assert.equal(result[1].hiddenGenes >= 0, true, "Not correct range of hiddenGenes");
                        assert.equal(result[1].hiddenGenes < 4, true, "Not correct range of hiddenGenes");
                    });
                });
            });

            it("Check all atrributes with HiddenGenesX(2) and matronGeneration < sireGeneration", function() {
                return instance.breedSim(9, 11, { from: accounts[0] }).then(function() {
                    return instance.getSimDetails(14, { from: accounts[0] }).then(function(result) {
                        assert.equal(result[1].body, 3, "Not correct body");
                        assert.equal(result[1].eye, 6, "Not correct eye");
                        assert.equal(result[1].hairstyle, 0, "Not correct hairstyle");
                        assert.equal(result[1].outfit, 30, "Not correct outfit");
                        assert.equal(result[1].accessory, 26, "Not correct accessory");
                        assert.equal(result[1].generation, 3, "Not correct generation");
                        assert.equal(result[1].hiddenGenes, 2, "Not correct hiddenGenes");

                        assert.equal(result[1].body >= 0, true, "Not correct range of body");
                        assert.equal(result[1].body < 4, true, "Not correct range of body");
                        assert.equal(result[1].eye >= 0, true, "Not correct range of eye");
                        assert.equal(result[1].eye < 8, true, "Not correct range of eye");
                        assert.equal(result[1].hairstyle >= 0, true, "Not correct range of hairstyle");
                        assert.equal(result[1].hairstyle < 128, true, "Not correct range of hairstyle");
                        assert.equal(result[1].outfit >= 0, true, "Not correct range of outfit");
                        assert.equal(result[1].outfit < 33, true, "Not correct range of outfit");
                        assert.equal(result[1].accessory >= 0, true, "Not correct range of accessory");
                        assert.equal(result[1].accessory < 33, true, "Not correct range of accessory");
                        assert.equal(result[1].hiddenGenes >= 0, true, "Not correct range of hiddenGenes");
                        assert.equal(result[1].hiddenGenes < 4, true, "Not correct range of hiddenGenes");
                    });
                });
            });
        });
    });

    // *** End Code here ***
});