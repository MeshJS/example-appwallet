import { CardanoWallet, useWallet } from "@meshsdk/react";
import { Transaction } from "@meshsdk/core";
import { KoiosProvider, AppWallet } from "@meshsdk/core";

export default function Home() {
  const { wallet } = useWallet();

  async function browserwalletstart() {
    const address =
      "addr_test1qqnnkc56unmkntvza0x70y65s3fs5awdpks7wpr4yu0mqm5vldqg2n2p8y4kyjm8sqfyg0tpq9042atz0fr8c3grjmys2gv2h5";
    const policy = "7343557b4addf062c584b9194d65ebaabe316787bfb77b2e3f9957be";
    const unit = "4d657368546f6b656e";

    const tx = new Transaction({ initiator: wallet })
      .sendLovelace(address, "1000000")
      .sendAssets(address, [
        {
          unit: `${policy}${unit}`,
          quantity: "1",
        },
      ]);

    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
    console.log(txHash);
  }

  async function appwalletstart() {
    const seed = [
      "depend",
      "join",
      "drastic",
      "sheriff",
      "magic",
      "luggage",
      "poverty",
      "there",
      "family",
      "food",
      "lion",
      "achieve",
      "flee",
      "inner",
      "pattern",
      "question",
      "raccoon",
      "claw",
      "nature",
      "warm",
      "among",
      "club",
      "nose",
      "dust",
    ];
    const token =
      "c494c915d33cd11487d274f19878c12b7e25bf5207631c63877fb6374d657368546f6b656e";
    const receiver =
      "addr_test1qqnnkc56unmkntvza0x70y65s3fs5awdpks7wpr4yu0mqm5vldqg2n2p8y4kyjm8sqfyg0tpq9042atz0fr8c3grjmys2gv2h5";

    const blockchainProvider = new KoiosProvider("preprod");
    const wallet = new AppWallet({
      networkId: 0,
      fetcher: blockchainProvider,
      submitter: blockchainProvider,
      key: {
        type: "mnemonic",
        words: seed,
      },
    });

    const address = wallet.getPaymentAddress();
    console.log(address);

    const utxos = await blockchainProvider.fetchAddressUTxOs(address);
    console.log(utxos);

    const tx = new Transaction({ initiator: wallet })
      .sendLovelace(receiver, "1000000")
      .sendAssets(receiver, [
        {
          unit: `${token}`,
          quantity: "1",
        },
      ]);

    const unsignedTx = await tx.build();
    const signedTx = await wallet.signTx(unsignedTx);
    const txHash = await wallet.submitTx(signedTx);
    console.log(txHash);
  }

  return (
    <main className="flex flex-col gap-4">
      <CardanoWallet />
      <button onClick={browserwalletstart}>browserwalletstart</button>
      <button onClick={appwalletstart}>appwalletstart</button>
    </main>
  );
}
